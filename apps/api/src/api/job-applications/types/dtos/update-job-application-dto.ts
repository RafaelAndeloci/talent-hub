import { JobApplication } from '../entities/job-application'

export type UpdateJobApplicationDto = Pick<
  JobApplication,
  'status' | 'stage' | 'rejection' | 'coverLetter'
>
