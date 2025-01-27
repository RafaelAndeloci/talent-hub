import { Entity } from '../../../../shared/types/entity'
import { JobApplicationStage } from '../enums/job-application-stage'
import { JobApplicationStatus } from '../enums/job-application-status'

export type Rejection = {
  rejectedBy: string
  reason: string
}

export interface JobApplication extends Entity {
  candidateId: string
  coverLetter: string | null
  jobOpeningId: string
  isAutoCreated: boolean
  status: JobApplicationStatus
  stage: JobApplicationStage
  appliedBy: string
  rejection: Rejection | null
  createdAt: Date
  updatedAt: Date
}
