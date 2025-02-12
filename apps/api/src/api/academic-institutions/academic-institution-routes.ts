import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { findById, findAll, create, update, remove } from './academic-institution-controller';
import {
    FindAllSchema,
    FindByIdSchema,
    UpdateSchema,
    CreateSchema,
    RemoveSchema,
} from './academic-institution-schema';

export const AcademicInstitutionRoutes: ApiResource = {
    resource: Resource.AcademicInstitutions,
    routes: [
        {
            action: Action.ReadById,
            method: 'get',
            auth: true,
            path: '/:id',
            handler: findById,
            schema: FindByIdSchema,
        },
        {
            action: Action.ReadAll,
            method: 'get',
            auth: true,
            path: '/',
            handler: findAll,
            schema: FindAllSchema,
        },
        {
            action: Action.Create,
            method: 'post',
            auth: true,
            path: '/',
            handler: create,
            schema: CreateSchema,
        },
        {
            action: Action.Update,
            method: 'put',
            auth: true,
            path: '/:id',
            handler: update,
            schema: UpdateSchema,
        },
        {
            action: Action.Delete,
            method: 'delete',
            auth: true,
            path: '/:id',
            handler: remove,
            schema: RemoveSchema,
        },
    ],
};
