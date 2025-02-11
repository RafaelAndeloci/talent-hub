import { RequestHandler } from 'express';
import {
    AuthContext,
    CreateJobApplicationPayload,
    FindAllJobApplicationDto,
    FindAllJobApplicationsQuery,
    Id,
    JobApplication,
    UpdateJobApplicationCoverLetterPayload,
    UpdateJobApplicationStagePayload,
    UpdateJobApplicationStatusPayload,
} from '@talent-hub/shared/types';

export type JobApplicationController = {
    findById: RequestHandler<Id, JobApplication, void, void, AuthContext>;
    findAll: RequestHandler<
        void,
        FindAllJobApplicationDto,
        void,
        FindAllJobApplicationsQuery,
        AuthContext
    >;
    create: RequestHandler<void, JobApplication, CreateJobApplicationPayload, void, AuthContext>;
    remove: RequestHandler<Id, void, void, void, AuthContext>;
    updateCoverLetter: RequestHandler<
        Id,
        JobApplication,
        UpdateJobApplicationCoverLetterPayload,
        void,
        AuthContext
    >;
    updateStage: RequestHandler<
        Id,
        JobApplication,
        UpdateJobApplicationStagePayload,
        void,
        AuthContext
    >;
    updateStatus: RequestHandler<
        Id,
        JobApplication,
        UpdateJobApplicationStatusPayload,
        void,
        AuthContext
    >;
};
