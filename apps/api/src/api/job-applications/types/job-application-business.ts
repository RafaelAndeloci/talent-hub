import { JobApplication } from './job-application';
import { CreateJobApplicationPayload } from './create-job-application-payload';
import { UpdateJobApplicationDto } from './update-job-application-dto';
import { FindAllJobApplicationsQuery } from './find-all-job-applications-query';
import { AuthContext } from '../../users/types/auth-context';
import { FindAllJobApplicationDto } from './find-all-job-application-dto';
import { UpdateJobApplicationCoverLetterPayload } from './update-job-application-cover-letter-payload';
import { UpdateJobApplicationStagePayload } from './update-job-application-stage-payload';
import { UpdateJobApplicationStatusPayload } from './update-job-application-status';

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

    updateCoverLetter: (args: {
        jobApplicationId: string;
        payload: UpdateJobApplicationCoverLetterPayload;
    }) => Promise<JobApplication>;

    updateStage: (args: {
        jobApplicationId: string;
        payload: UpdateJobApplicationStagePayload;
    }) => Promise<JobApplication>;

    updateStatus: (args: {
        jobApplicationId: string;
        payload: UpdateJobApplicationStatusPayload;
        context: AuthContext;
    }) => Promise<JobApplication>;
};
