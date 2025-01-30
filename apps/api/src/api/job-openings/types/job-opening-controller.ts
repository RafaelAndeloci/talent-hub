import { RequestHandler } from 'express';
import { JobOpeningDto } from './job-opening-dto';
import { AuthContext } from '../../users/types/auth-context';
import { FindAllJobOpeningsQuery } from './find-all-job-openings-query';
import { FindAllJobOpeningsDto } from './find-all-job-openings-dto';
import { CreateJobOpeningPayload } from './create-job-opening-payload';
import { Id } from '../../../types/id';
import { UpdateJobOpeningPayload } from './update-job-opening-payload';
import { FillJobApplicationPayload } from './fill-job-application-payload';

export type JobOpeningController = {
    findById: RequestHandler<Id, JobOpeningDto, void, void, AuthContext>;

    findAll: RequestHandler<
        void,
        FindAllJobOpeningsDto,
        void,
        FindAllJobOpeningsQuery,
        AuthContext
    >;

    create: RequestHandler<void, JobOpeningDto, CreateJobOpeningPayload, void, AuthContext>;

    update: RequestHandler<Id, JobOpeningDto, UpdateJobOpeningPayload, void, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    open: RequestHandler<Id, JobOpeningDto, void, void, AuthContext>;

    close: RequestHandler<Id, JobOpeningDto, void, void, AuthContext>;

    toDraft: RequestHandler<Id, JobOpeningDto, void, void, AuthContext>;

    fill: RequestHandler<Id, JobOpeningDto, FillJobApplicationPayload, void, AuthContext>;
};
