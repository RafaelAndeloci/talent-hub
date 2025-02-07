import { RequestHandler } from 'express';
import { JobApplication } from './job-application';
import { AuthContext } from '../../users/types/auth-context';
import { CreateJobApplicationPayload } from './create-job-application-payload';
import { Id } from '../../../types/id';
import { FindAllJobApplicationsQuery } from './find-all-job-applications-query';
import { FindAllJobApplicationDto } from './find-all-job-application-dto';
import { UpdateJobApplicationCoverLetterPayload } from './update-job-application-cover-letter-payload';
import { UpdateJobApplicationStagePayload } from './update-job-application-stage-payload';
import { UpdateJobApplicationStatusPayload } from './update-job-application-status';

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
