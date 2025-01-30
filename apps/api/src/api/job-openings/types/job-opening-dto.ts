import { JobOpening } from './job-opening';

export type JobOpeningDto = JobOpening | Omit<JobOpening, 'selectedApplicationId'>;
