import { RequestHandler } from 'express';
import { JobApplication } from './job-application';
import { AuthContext } from '../../users/types/auth-context';
import { CreateJobApplicationPayload } from './create-job-application-payload';
import { UpdateJobApplicationDto } from './update-job-application-dto';
import { Id } from '../../../types/id';
import { FindAllJobApplicationsQuery } from './find-all-job-applications-query';
import { FindAllJobApplicationDto } from './find-all-job-application-dto';

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
    update: RequestHandler<Id, JobApplication, UpdateJobApplicationDto, void, AuthContext>;
    remove: RequestHandler<Id, void, void, void, AuthContext>;
};
