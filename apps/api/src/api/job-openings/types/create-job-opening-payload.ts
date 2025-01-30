import { JobOpening } from './job-opening';

export type CreateJobOpeningPayload = Omit<JobOpening, 'hiredCandidateId' | 'id'>;
