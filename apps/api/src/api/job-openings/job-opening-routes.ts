import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateJobOpeningSchema,
    FillJobOpeningSchema,
    FindJobOpeningByIdSchema,
    FindAllJobOpeningsSchema,
    UpdateJobOpeningSchema,
    UpdateJobOpeningStatusSchema,
} from './job-opening-schema';
import { jobOpeningController } from './job-opening-controller';
import { ApiResource } from '../../types/api-resource';

export const jobOpeningRoutes: ApiResource = {
    resource: Resource.JobOpenings,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllJobOpeningsSchema,
            action: Action.ReadAll,
            handler: jobOpeningController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindJobOpeningByIdSchema,
            action: Action.ReadById,
            handler: jobOpeningController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateJobOpeningSchema,
            action: Action.Create,
            handler: jobOpeningController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: UpdateJobOpeningSchema,
            action: Action.Update,
            handler: jobOpeningController.update,
        },
        {
            method: 'patch',
            path: `/:id/open`,
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.Update,
            handler: jobOpeningController.open,
        },
        {
            method: 'patch',
            path: '/:id/close',
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.Update,
            handler: jobOpeningController.close,
        },
        {
            method: 'patch',
            path: '/:id/draft',
            auth: true,
            schema: UpdateJobOpeningStatusSchema,
            action: Action.Update,
            handler: jobOpeningController.toDraft,
        },
        {
            method: 'patch',
            path: '/:id/fill',
            auth: true,
            schema: FillJobOpeningSchema,
            action: Action.Update,
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
