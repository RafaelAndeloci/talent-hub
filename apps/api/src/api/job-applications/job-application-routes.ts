import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { JobApplicationController } from './job-application-controller';
import { JobApplicationApiSchema } from '@talent-hub/shared';

const jobApplicationController = new JobApplicationController();

export const jobApplicationRoutes: ApiResource = {
    resource: Resource.JobApplications,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: JobApplicationApiSchema.FindAll,
            action: Action.ReadAll,
            handler: jobApplicationController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: JobApplicationApiSchema.FindById,
            action: Action.ReadById,
            handler: jobApplicationController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: JobApplicationApiSchema.Create,
            action: Action.Create,
            handler: jobApplicationController.create,
        },
        {
            method: 'patch',
            path: '/:id/cover-letter',
            auth: true,
            schema: JobApplicationApiSchema.UpdateCoverLetter,
            action: Action.jobApplicationUpdateCoverLetter,
            handler: jobApplicationController.updateCoverLetter,
        },
        {
            method: 'patch',
            path: '/:id/stage',
            auth: true,
            schema: JobApplicationApiSchema.UpdateStage,
            action: Action.jobApplicationUpdateStage,
            handler: jobApplicationController.updateStage,
        },
        {
            method: 'patch',
            path: '/:id/status',
            auth: true,
            schema: JobApplicationApiSchema.UpdateStatus,
            action: Action.jobApplicationUpdateStatus,
            handler: jobApplicationController.updateStatus,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: JobApplicationApiSchema.Remove,
            action: Action.Delete,
            handler: jobApplicationController.remove,
        },
    ],
};
