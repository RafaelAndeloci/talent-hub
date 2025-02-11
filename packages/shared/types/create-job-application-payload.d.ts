import { JobApplication } from './job-application';

export type CreateJobApplicationPayload = Pick<
    JobApplication,
    'candidateId' | 'jobOpeningId' | 'coverLetter'
>;
