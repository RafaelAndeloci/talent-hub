import { JobApplication } from '../entities/job-application'

export type CreateJobApplicationDto = Pick<
  JobApplication,
  'candidateId' | 'jobOpeningId' | 'coverLetter'
>
