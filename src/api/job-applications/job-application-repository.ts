import { makeRepository } from '../../shared/services/repository'
import {
  JobApplicationModel,
  JobApplicationModelAttr,
} from './job-application-model'
import { fromDatabase, toDatabase } from './job-application-parser'
import { JobApplication } from './types/entities/job-application'

export const jobApplicationRepository = makeRepository<
  JobApplication,
  JobApplicationModelAttr,
  JobApplicationModel
>({
  model: JobApplicationModel,
  toDatabase,
  fromDatabase,
})
