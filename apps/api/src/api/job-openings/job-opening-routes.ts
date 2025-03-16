import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { JobOpeningController } from './job-opening-controller';
import { JobOpeningApiSchema } from '@talent-hub/shared';

const jobOpeningController = new JobOpeningController();

export const jobOpeningRoutes: ApiResource = {
    resource: Resource.JobOpenings,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: JobOpeningApiSchema.FindAll,
            action: Action.ReadAll,
            handler: jobOpeningController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: JobOpeningApiSchema.FindById,
            action: Action.ReadById,
            handler: jobOpeningController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: JobOpeningApiSchema.Create,
            action: Action.Create,
            handler: jobOpeningController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: JobOpeningApiSchema.Update,
            action: Action.Update,
            handler: jobOpeningController.update,
        },
        {
            method: 'patch',
            path: '/:id/fill',
            auth: true,
            schema: JobOpeningApiSchema.UpdateStatus,
            action: Action.Update,
            handler: jobOpeningController.updateStatus,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: JobOpeningApiSchema.Remove,
            action: Action.Delete,
            handler: jobOpeningController.remove,
        },
    ],
};
