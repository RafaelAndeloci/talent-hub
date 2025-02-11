import {
    Id,
    JobOpeningDto,
    AuthContext,
    FindAllJobOpeningsDto,
    FindAllJobOpeningsQuery,
    CreateJobOpeningPayload,
    UpdateJobOpeningPayload,
    FillJobApplicationPayload,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';

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
