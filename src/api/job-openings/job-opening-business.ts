import { FindAllArgs } from '../../shared/types/find-all-args'
import { PagedList } from '../../shared/types/paged-list'
import { UserDto } from '../users/types/dtos/user-dto'
import { merge, newInstance, toDto } from './job-opening-parser'
import { jobOpeningRepository } from './job-opening-repository'
import { JobOpeningDto } from './types/dtos/job-opening-dto'
import { JobOpening } from './types/entities/job-opening'
import { companyRepository } from '../companies/company-repository'
import { ApiError } from '../../shared/types/api-error'
import { JobOpeningStatus } from './types/enums/job-opening-status'
import { Role } from '../users/types/enums/role'
import { jobQueueService } from '../../shared/services/job-service'
import { AppEvent } from '../../shared/enums/app-event'
import { jobApplicationRepository } from '../job-applications/job-application-repository'
import { JobApplicationStatus } from '../job-applications/types/enums/job-application-status'

export const jobOpeningBusiness = {
  /**
   * Find a job opening by ID.
   * @param {string} id - The ID of the job opening.
   * @param {Role} userRole - The role of the user.
   * @returns {Promise<JobOpeningDto>} The job opening.
   * @throws {ApiError} If the job opening is not found.
   */
  async findById(id: string, userRole: Role): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening) throw new Error(`job opening with id ${id} not found`)

    return toDto(jobOpening, userRole)
  },

  /**
   * Find all job openings.
   * @param {FindAllArgs<JobOpening>} query - The query arguments.
   * @param {UserDto} user - The user.
   * @returns {Promise<PagedList<JobOpeningDto>>} The list of job openings.
   */
  async findAll(
    query: FindAllArgs<JobOpening>,
    user: UserDto,
  ): Promise<PagedList<JobOpeningDto>> {
    const jobOpenings = await jobOpeningRepository.findAll(query)

    return jobOpenings.parse((jobOpening) => toDto(jobOpening, user.role))
  },

  /**
   * Create a new job opening.
   * @param {Omit<JobOpening, 'hiredCandidateId' | 'id'>} payload - The job opening payload.
   * @returns {Promise<JobOpeningDto>} The created job opening.
   * @throws {ApiError} If the job opening cannot be created with the given status or if validation fails.
   */
  async create(
    payload: Omit<JobOpening, 'hiredCandidateId' | 'id'>,
  ): Promise<JobOpeningDto> {
    if (!jobOpeningBusiness.canBeCreateWithStatus(payload.status))
      ApiError.throwBadRequest(
        'job opening cannot be created with this status. Allowed statuses are draft and open',
      )

    const company = await companyRepository.findById(payload.companyId)
    if (!company)
      ApiError.throwNotFound(`company with id ${payload.companyId} not found`)

    const alreadyExists = await jobOpeningRepository.existsByTitle({
      title: payload.title,
      companyId: payload.companyId,
    })
    if (alreadyExists)
      ApiError.throwBadRequest(
        `job opening with title ${payload.title} already exists`,
      )

    const jobOpening = newInstance(payload)
    await jobOpeningRepository.create(jobOpening)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningCreated,
      payload: {
        jobOpeningId: jobOpening.id,
      },
    })

    return toDto(jobOpening, Role.companyAdmin)
  },

  /**
   * Update a job opening.
   * @param {string} id - The ID of the job opening.
   * @param {Partial<Omit<JobOpening, 'hiredCandidateId' | 'id' | 'status'>>} payload - The job opening payload.
   * @returns {Promise<JobOpeningDto>} The updated job opening.
   * @throws {ApiError} If the job opening is not found or if validation fails.
   */
  async update(
    id: string,
    payload: Partial<Omit<JobOpening, 'hiredCandidateId' | 'id' | 'status'>>,
  ): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.title !== payload.title) {
      const alreadyExists = await jobOpeningRepository.existsByTitle({
        title: payload.title!,
        companyId: jobOpening!.companyId,
      })
      if (alreadyExists)
        ApiError.throwBadRequest(
          `job opening with title ${payload.title} already exists`,
        )
    }

    const updatedJobOpening = merge(jobOpening!, payload)
    await jobOpeningRepository.update(updatedJobOpening)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningUpdated,
      payload: {
        jobOpeningId: updatedJobOpening.id,
      },
    })

    return toDto(updatedJobOpening, Role.companyAdmin)
  },

  /**
   * Close a job opening.
   * @param {string} id - The ID of the job opening.
   * @returns {Promise<JobOpeningDto>} The closed job opening.
   * @throws {ApiError} If the job opening is not found or cannot be closed.
   */
  async close(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (!jobOpeningBusiness.canBeClosed(jobOpening!))
      ApiError.throwBadRequest('job opening cannot be closed')

    jobOpening!.status = JobOpeningStatus.closed

    await jobOpeningRepository.update(jobOpening!)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningUpdated,
      payload: {
        jobOpeningId: jobOpening!.id,
      },
    })

    return toDto(jobOpening!, Role.companyAdmin)
  },

  /**
   * Open a job opening.
   * @param {string} id - The ID of the job opening.
   * @returns {Promise<JobOpeningDto>} The opened job opening.
   * @throws {ApiError} If the job opening is not found or cannot be opened.
   */
  async open(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.status !== JobOpeningStatus.draft)
      ApiError.throwBadRequest('job opening cannot be opened')

    jobOpening!.status = JobOpeningStatus.open

    await jobOpeningRepository.update(jobOpening!)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningUpdated,
      payload: {
        jobOpeningId: jobOpening!.id,
      },
    })

    return toDto(jobOpening!, Role.companyAdmin)
  },

  /**
   * Fill a job opening.
   * @param {Object} params - The parameters.
   * @param {string} params.id - The ID of the job opening.
   * @param {string} params.selectedApplicationId - The ID of the selected application.
   * @returns {Promise<JobOpeningDto>} The filled job opening.
   * @throws {ApiError} If the job opening is not found or cannot be filled.
   */
  async fill({
    id,
    selectedApplicationId,
  }: {
    id: string
    selectedApplicationId: string
    user: UserDto
  }): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.status !== JobOpeningStatus.open)
      ApiError.throwBadRequest('job opening cannot be filled')

    jobOpening!.status = JobOpeningStatus.filled
    jobOpening!.selectedApplicationId = selectedApplicationId

    await jobOpeningRepository.update(jobOpening!)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningUpdated,
      payload: {
        jobOpeningId: jobOpening!.id,
      },
    })

    return toDto(jobOpening!, Role.companyAdmin)
  },

  /**
   * Set a job opening to draft.
   * @param {string} id - The ID of the job opening.
   * @returns {Promise<JobOpeningDto>} The job opening set to draft.
   * @throws {ApiError} If the job opening is not found or cannot be set to draft.
   */
  async toDraft(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.status !== JobOpeningStatus.open)
      ApiError.throwBadRequest('job opening cannot be set to draft')

    const existsApplications = await jobApplicationRepository.exists({
      jobOpeningId: jobOpening!.id,
      status: JobApplicationStatus.applied,
    })
    if (existsApplications)
      ApiError.throwBadRequest(
        'job opening cannot be set to draft. There are pending applications. To set to draft, all applications must be reject all applications or delete them',
      )

    jobOpening!.status = JobOpeningStatus.draft

    await jobOpeningRepository.update(jobOpening!)

    return toDto(jobOpening!, Role.companyAdmin)
  },

  /**
   * Remove a job opening.
   * @param {string} id - The ID of the job opening.
   * @returns {Promise<void>}
   * @throws {ApiError} If the job opening is not found.
   */
  async remove(id: string): Promise<void> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    await jobQueueService.enqueue({
      event: AppEvent.jobOpeningRemoved,
      payload: {
        jobOpeningId: jobOpening!.id,
      },
    })

    await jobOpeningRepository.deleteById(id)
  },

  /**
   * Validate a job opening for a job application.
   * @param {string} jobOpeningId - The ID of the job opening.
   * @returns {Promise<JobOpening>} The validated job opening.
   * @throws {ApiError} If the job opening is not found or if validation fails.
   */
  async validateForApplication(jobOpeningId: string) {
    const jobOpening = await jobOpeningRepository.findById(jobOpeningId)
    if (!jobOpening) {
      ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`)
    }

    const acceptNewApplications = jobOpening!.status === JobOpeningStatus.open
    if (!acceptNewApplications) {
      ApiError.throwUnprocessableEntity(
        `job opening ${jobOpeningId} is not accepting applications`,
      )
    }

    return jobOpening
  },

  /**
   * Check if a job opening can be closed.
   * @param {JobOpening} jobOpening - The job opening.
   * @returns {boolean} True if the job opening can be closed, false otherwise.
   */
  canBeClosed(jobOpening: JobOpening): boolean {
    const closableStatuses: JobOpeningStatus[] = [
      JobOpeningStatus.open,
      JobOpeningStatus.draft,
    ]
    return closableStatuses.includes(jobOpening.status)
  },

  /**
   * Check if a job opening can be created with the given status.
   * @param {JobOpeningStatus} status - The status.
   * @returns {boolean} True if the job opening can be created with the given status, false otherwise.
   */
  canBeCreateWithStatus(status: JobOpeningStatus): boolean {
    const allowedStatuses: JobOpeningStatus[] = [
      JobOpeningStatus.draft,
      JobOpeningStatus.open,
    ]

    return allowedStatuses.includes(status)
  },
}
