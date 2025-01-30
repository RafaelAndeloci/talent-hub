import { JobApplication } from './job-application';
import { CreateJobApplicationPayload } from './create-job-application-payload';
import { UpdateJobApplicationDto } from './update-job-application-dto';
import { FindAllJobApplicationsQuery } from './find-all-job-applications-query';
import { AuthContext } from '../../users/types/auth-context';
import { FindAllJobApplicationDto } from './find-all-job-application-dto';

export type JobApplicationBusiness = {
    findById: (args: { jobApplicationId: string }) => Promise<JobApplication>;
    findAll: (args: { query: FindAllJobApplicationsQuery }) => Promise<FindAllJobApplicationDto>;
    create: (args: {
        payload: CreateJobApplicationPayload;
        context: AuthContext;
    }) => Promise<JobApplication>;
    update: (args: {
        jobApplicationId: string;
        payload: UpdateJobApplicationDto;
    }) => Promise<JobApplication>;
    remove: (args: { jobApplicationId: string }) => Promise<void>;
};
