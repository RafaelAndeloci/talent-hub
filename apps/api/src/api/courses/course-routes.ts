import { findAll, findById, create, update, remove } from './course-controller';
import {
    FindAllSchema,
    FindByIdSchema,
    CreateSchema,
    UpdateSchema,
    DeleteSchema,
} from './course-schema';
import { ApiResource } from '../../types/api-resource';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';

export const courseRoutes: ApiResource = {
    resource: Resource.Courses,
    routes: [
        {
            path: '/',
            method: 'get',
            action: Action.ReadAll,
            handler: findAll,
            schema: FindAllSchema,
            auth: true,
        },
        {
            path: '/:id',
            method: 'get',
            action: Action.ReadById,
            handler: findById,
            schema: FindByIdSchema,
            auth: true,
        },
        {
            path: '/',
            method: 'post',
            action: Action.Create,
            handler: create,
            schema: CreateSchema,
            auth: true,
        },
        {
            path: '/:id',
            method: 'put',
            action: Action.Update,
            handler: update,
            schema: UpdateSchema,
            auth: true,
        },
        {
            path: '/:id',
            method: 'delete',
            action: Action.Delete,
            handler: remove,
            schema: DeleteSchema,
            auth: true,
        },
    ],
};
