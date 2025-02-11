import {
    AuthContext,
    CreateJobApplicationPayload,
    FindAllJobApplicationDto,
    FindAllJobApplicationsQuery,
    JobApplication,
    UpdateJobApplicationCoverLetterPayload,
    UpdateJobApplicationStagePayload,
    UpdateJobApplicationStatusPayload,
} from '@talent-hub/shared';

export type JobApplicationBusiness = {
    findById: (args: { jobApplicationId: string }) => Promise<JobApplication>;

    findAll: (args: { query: FindAllJobApplicationsQuery }) => Promise<FindAllJobApplicationDto>;

    create: (args: {
        payload: CreateJobApplicationPayload;
        context: AuthContext;
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
