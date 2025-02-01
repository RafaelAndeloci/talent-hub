import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateJobOpeningSchema,
    FillJobOpeningSchema,
    FindJobOpeningByIdSchema,
    FindJobOpeningsSchema,
    UpdateJobOpeningSchema,
    UpdateJobOpeningStatusSchema,
} from './job-opening-schema';
import { jobOpeningController } from './job-opening-controller';
import { ApiResource } from '../../types/api-resource';

export const jobOpeningRoutes: ApiResource = {
    resource: Resource.jobOpenings,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindJobOpeningsSchema,
            action: Action.readAll,
            handler: jobOpeningController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindJobOpeningByIdSchema,
            action: Action.readById,
            handler: jobOpeningController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateJobOpeningSchema,
            action: Action.create,
            handler: jobOpeningController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: UpdateJobOpeningSchema,
            action: Action.update,
            handler: jobOpeningController.update,
        },
        {
            method: 'patch',
            path: '/:id/open',
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.update,
            handler: jobOpeningController.open,
        },
        {
            method: 'patch',
            path: '/:id/close',
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.update,
            handler: jobOpeningController.close,
        },
        {
            method: 'patch',
            path: '/:id/draft',
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.update,
            handler: jobOpeningController.toDraft,
        },
        {
            method: 'patch',
            path: '/:id/fill',
            auth: true,
            schema: FillJobOpeningSchema,
            action: Action.update,
            handler: jobOpeningController.fill,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: FindJobOpeningByIdSchema,
            action: Action.delete,
            handler: jobOpeningController.remove,
        },
    ],
};
