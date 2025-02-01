import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateJobApplicationSchema,
    DeleteJobApplicationSchema,
    FindAllJobApplicationsSchema,
    FindJobApplicationByIdSchema,
    UpdateJobApplicationSchema,
} from './job-application-schema';
import { jobApplicationController } from './job-application-controller';
import { ApiResource } from '../../types/api-resource';

export const jobApplicationRoutes: ApiResource = {
    resource: Resource.jobApplications,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllJobApplicationsSchema,
            action: Action.readAll,
            handler: jobApplicationController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindJobApplicationByIdSchema,
            action: Action.readById,
            handler: jobApplicationController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateJobApplicationSchema,
            action: Action.create,
            handler: jobApplicationController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: UpdateJobApplicationSchema,
            action: Action.update,
            handler: jobApplicationController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: DeleteJobApplicationSchema,
            action: Action.delete,
            handler: jobApplicationController.remove,
        },
    ],
};
