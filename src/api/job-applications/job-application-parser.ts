import * as uuid from 'uuid'

import { UserDto } from '../users/types/dtos/user-dto'
import { JobApplicationModelAttr } from './job-application-model'
import { JobApplication } from './types/entities/job-application'
import { Role } from '../users/types/enums/role'
import { JobApplicationStage } from './types/enums/job-application-stage'
import { JobApplicationStatus } from './types/enums/job-application-status'
import { CreateJobApplicationDto } from './types/dtos/create-job-application-dto'
import { UpdateJobApplicationDto } from './types/dtos/update-job-application-dto'

export const toDatabase = (
  entity: JobApplication,
): JobApplicationModelAttr => ({
  id: entity.id,
  candidateId: entity.candidateId,
  coverLetter: entity.coverLetter,
  jobOpeningId: entity.jobOpeningId,
  stage: entity.stage,
  status: entity.status,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
  rejectedBy: entity.rejection?.rejectedBy ?? null,
  rejectionReason: entity.rejection?.reason ?? null,
  appliedBy: entity.appliedBy,
  isAutoCreated: entity.isAutoCreated,
})

export const fromDatabase = (
  model: JobApplicationModelAttr,
): JobApplication => ({
  id: model.id,
  candidateId: model.candidateId,
  coverLetter: model.coverLetter,
  jobOpeningId: model.jobOpeningId,
  isAutoCreated: model.isAutoCreated,
  stage: model.stage,
  status: model.status,
  rejection:
    model.rejectedBy && model.rejectionReason
      ? {
          rejectedBy: model.rejectedBy,
          reason: model.rejectionReason,
        }
      : null,
  appliedBy: model.appliedBy,
  createdAt: model.createdAt,
  updatedAt: model.updatedAt,
})

export const merge: (
  original: JobApplication,
  changes: UpdateJobApplicationDto,
) => JobApplication = (original, changes) => ({
  id: original.id,
  candidateId: original.candidateId,
  coverLetter: changes.coverLetter ?? original.coverLetter,
  jobOpeningId: original.jobOpeningId,
  isAutoCreated: original.isAutoCreated,
  status: changes.status ?? original.status,
  stage: changes.stage ?? original.stage,
  appliedBy: original.appliedBy,
  rejection: changes.rejection ?? original.rejection,
  createdAt: original.createdAt,
  updatedAt: original.updatedAt,
})

export const newInstance = (
  payload: CreateJobApplicationDto,
  user: UserDto,
): JobApplication => ({
  id: uuid.v4(),
  candidateId: payload.candidateId,
  coverLetter: payload.coverLetter,
  jobOpeningId: payload.jobOpeningId,
  isAutoCreated: user.role === Role.sysAdmin,
  status: JobApplicationStatus.applied,
  stage: JobApplicationStage.screening,
  appliedBy: user.id,
  rejection: null,
  createdAt: new Date(),
  updatedAt: new Date(),
})
