import { ApiResource } from '../../types/api-resource';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { CourseApiSchema } from '@talent-hub/shared';
import { CourseController } from './course-controller';

const courseController = new CourseController();

export const courseRoutes: ApiResource = {
    resource: Resource.Courses,
    routes: [
        {
            path: '/',
            method: 'get',
            action: Action.ReadAll,
            handler: courseController.findAll,
            schema: CourseApiSchema.FindAll,
            auth: true,
        },
        {
            path: '/:id',
            method: 'get',
            action: Action.ReadById,
            handler: courseController.findById,
            schema: CourseApiSchema.FindById,
            auth: true,
        },
        {
            path: '/',
            method: 'post',
            action: Action.Create,
            handler: courseController.create,
            schema: CourseApiSchema.Create,
            auth: true,
        },
        {
            path: '/:id',
            method: 'put',
            action: Action.Update,
            handler: courseController.update,
            schema: CourseApiSchema.Update,
            auth: true,
        },
        {
            path: '/:id',
            method: 'delete',
            action: Action.Delete,
            handler: courseController.remove,
            schema: CourseApiSchema.Remove,
            auth: true,
        },
        {
            path: '/:id/:status',
            method: 'put',
            action: Action.Update,
            handler: courseController.updateStatus,
            schema: CourseApiSchema.UpdateStatus,
            auth: true,
        }
    ],
};
