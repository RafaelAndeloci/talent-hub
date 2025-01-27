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
import { candidateRepository } from '../candidates/candidate-repository'

export const jobOpeningBusiness = {
  async findById(id: string, userRole: Role): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening) throw new Error(`job opening with id ${id} not found`)

    return toDto(jobOpening, userRole)
  },

  async findAll(
    query: FindAllArgs<JobOpening>,
    user: UserDto,
  ): Promise<PagedList<JobOpeningDto>> {
    const jobOpenings = await jobOpeningRepository.findAll(query)

    return jobOpenings.parse((jobOpening) => toDto(jobOpening, user.role))
  },

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

    return toDto(jobOpening, Role.companyAdmin)
  },

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

    return toDto(updatedJobOpening, Role.companyAdmin)
  },

  async close(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (!jobOpeningBusiness.canBeClosed(jobOpening!))
      ApiError.throwBadRequest('job opening cannot be closed')

    jobOpening!.status = JobOpeningStatus.closed

    await jobOpeningRepository.update(jobOpening!)

    return toDto(jobOpening!, Role.companyAdmin)
  },

  async open(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.status !== JobOpeningStatus.draft)
      ApiError.throwBadRequest('job opening cannot be opened')

    jobOpening!.status = JobOpeningStatus.open

    await jobOpeningRepository.update(jobOpening!)

    return toDto(jobOpening!, Role.companyAdmin)
  },

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

    //TODO: validat se o candidate vinculado a selectedApplicationId está disponível para a vaga

    jobOpening!.status = JobOpeningStatus.filled
    jobOpening!.selectedApplicationId = selectedApplicationId

    await jobOpeningRepository.update(jobOpening!)

    return toDto(jobOpening!, Role.companyAdmin)
  },

  async toDraft(id: string): Promise<JobOpeningDto> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    if (jobOpening!.status !== JobOpeningStatus.open)
      ApiError.throwBadRequest('job opening cannot be set to draft')

    jobOpening!.status = JobOpeningStatus.draft

    await jobOpeningRepository.update(jobOpening!)

    return toDto(jobOpening!, Role.companyAdmin)
  },

  async remove(id: string): Promise<void> {
    const jobOpening = await jobOpeningRepository.findById(id)
    if (!jobOpening)
      ApiError.throwNotFound(`job opening with id ${id} not found`)

    await jobOpeningRepository.deleteById(id)
  },

  canBeClosed(jobOpening: JobOpening): boolean {
    const closableStatuses: JobOpeningStatus[] = [
      JobOpeningStatus.open,
      JobOpeningStatus.draft,
    ]
    return closableStatuses.includes(jobOpening.status)
  },

  canBeCreateWithStatus(status: JobOpeningStatus): boolean {
    const allowedStatuses: JobOpeningStatus[] = [
      JobOpeningStatus.draft,
      JobOpeningStatus.open,
    ]

    return allowedStatuses.includes(status)
  },
}
