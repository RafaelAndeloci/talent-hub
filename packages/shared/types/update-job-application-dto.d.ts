import { JobApplication } from './job-application';

export type UpdateJobApplicationDto = Pick<
    JobApplication,
    'status' | 'stage' | 'rejection' | 'coverLetter'
>;
