import { JobOpening } from '../entities/job-opening'

export type JobOpeningDto =
  | JobOpening
  | Omit<JobOpening, 'selectedApplicationId'>
