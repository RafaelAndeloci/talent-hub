import { CreateJobOpeningPayload } from './create-job-opening-payload';

export type UpdateJobOpeningPayload = Partial<Omit<CreateJobOpeningPayload, 'status'>>;
