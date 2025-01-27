import { ApiError } from '../../shared/types/api-error'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { jobApplicationRepository } from './job-application-repository'
import { JobApplication } from './types/entities/job-application'
import { JobApplicationStatus } from './types/enums/job-application-status'
import { jobQueueService } from '../../shared/services/job-service'
import { AppEvent } from '../../shared/enums/app-event'
import { candidateBusiness } from '../candidates/candidate-business'
import { jobOpeningBusiness } from '../job-openings/job-opening-business'
import { merge, newInstance } from './job-application-parser'
import { UserDto } from '../users/types/dtos/user-dto'
import { UpdateJobApplicationDto } from './types/dtos/update-job-application-dto'
import { CreateJobApplicationDto } from './types/dtos/create-job-application-dto'

export const jobApplicationBusiness = {
  async findById(id: string) {
    const jobApplication = await jobApplicationRepository.findById(id)
    if (!jobApplication) {
      ApiError.throwNotFound(`job application with id ${id} not found`)
    }

    return jobApplication
  },

  findAll(args: FindAllArgs<JobApplication>) {
    return jobApplicationRepository.findAll(args)
  },

  async create({
    payload,
    user,
  }: {
    payload: CreateJobApplicationDto
    user: UserDto
  }) {
    const existing = await jobApplicationRepository.exists({
      candidateId: payload.candidateId,
      jobOpeningId: payload.jobOpeningId,
      status: JobApplicationStatus.applied,
    })
    if (existing) {
      ApiError.throwBadRequest('job application already exists')
    }

    await candidateBusiness.validateForApplication(
      payload.candidateId,
      user.role,
    )

    await jobOpeningBusiness.validateForApplication(payload.jobOpeningId)

    const jobApplication = newInstance(payload, user)
    await jobApplicationRepository.create(jobApplication)

    await jobQueueService.enqueue({
      event: AppEvent.jobApplicationCreated,
      payload: {
        jobApplicationId: jobApplication.id,
      },
    })

    return jobApplication
  },

  async update({
    id,
    payload,
  }: {
    id: string
    payload: UpdateJobApplicationDto
  }) {
    const jobApplication = await jobApplicationRepository.findById(id)
    if (!jobApplication) {
      ApiError.throwNotFound(`job application with id ${id} not found`)
    }

    if (jobApplication!.status !== JobApplicationStatus.applied) {
      ApiError.throwBadRequest(
        'job application status must be applied to be updated',
      )
    }

    if (
      payload.status === JobApplicationStatus.rejected &&
      !payload.rejection
    ) {
      ApiError.throwBadRequest('rejection reason is required')
    }

    const updated = merge(jobApplication!, payload)
    await jobApplicationRepository.update(updated)

    await jobQueueService.enqueue({
      event: AppEvent.jobApplicationUpdated,
      payload: {
        jobApplicationId: updated.id,
      },
    })

    return updated
  },

  async remove(id: string) {
    const jobApplication = await jobApplicationRepository.findById(id)
    if (!jobApplication) {
      ApiError.throwNotFound(`job application with id ${id} not found`)
    }

    await jobApplicationRepository.deleteById(id)

    await jobQueueService.enqueue({
      event: AppEvent.jobApplicationRemoved,
      payload: {
        jobApplicationId: id,
      },
    })
  },
}
