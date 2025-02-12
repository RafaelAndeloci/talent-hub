import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import {
    CreateJobApplicationSchema,
    DeleteJobApplicationSchema,
    FindAllJobApplicationsSchema,
    FindJobApplicationByIdSchema,
    UpdateJobApplicationCoverLetterSchema,
    UpdateJobApplicationStageSchema,
    UpdateJobApplicationStatusSchema,
} from './job-application-schema';
import { jobApplicationController } from './job-application-controller';

export const jobApplicationRoutes: ApiResource = {
    resource: Resource.JobApplications,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllJobApplicationsSchema,
            action: Action.ReadAll,
            handler: jobApplicationController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindJobApplicationByIdSchema,
            action: Action.ReadById,
            handler: jobApplicationController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateJobApplicationSchema,
            action: Action.Create,
            handler: jobApplicationController.create,
        },
        {
            method: 'patch',
            path: '/:id/cover-letter',
            auth: true,
            schema: UpdateJobApplicationCoverLetterSchema,
            action: Action.jobApplicationUpdateCoverLetter,
            handler: jobApplicationController.updateCoverLetter,
        },
        {
            method: 'patch',
            path: '/:id/stage',
            auth: true,
            schema: UpdateJobApplicationStageSchema,
            action: Action.jobApplicationUpdateStage,
            handler: jobApplicationController.updateStage,
        },
        {
            method: 'patch',
            path: '/:id/status',
            auth: true,
            schema: UpdateJobApplicationStatusSchema,
            action: Action.jobApplicationUpdateStatus,
            handler: jobApplicationController.updateStatus,
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
