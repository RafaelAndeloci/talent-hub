import { Action } from '../../enums/action';
import { Resource } from '../../enums/resource';
import { ApiResource } from '../../types/api-resource';
import { skillController } from './skill-controller';
import {
    CreateSkillSchema,
    DeleteSkillSchema,
    FindAllSkillsSchema,
    FindSkillByIdSchema,
    UpdateSkillSchema,
    UpdateSkillStatusSchema,
} from './skill-schema';

export const skillResource: ApiResource = {
    resource: Resource.skills,
    routes: [
        {
            path: '/',
            method: 'get',
            action: 'read_by_id',
            schema: FindAllSkillsSchema,
            handler: skillController.findAll,
            auth: true,
        },
        {
            path: '/:id',
            method: 'get',
            action: 'read_by_id',
            schema: FindSkillByIdSchema,
            handler: skillController.findById,
            auth: true,
        },
        {
            path: '/',
            method: 'post',
            action: 'create',
            schema: CreateSkillSchema,
            handler: skillController.create,
            auth: true,
        },
        {
            path: '/:id',
            method: 'put',
            action: 'update',
            schema: UpdateSkillSchema,
            handler: skillController.update,
            auth: true,
        },
        {
            path: '/:id',
            method: 'delete',
            action: 'delete',
            schema: DeleteSkillSchema,
            handler: skillController.remove,
            auth: true,
        },
        {
            path: '/:id/status',
            method: 'patch',
            action: Action.skillUpdateStatus,
            schema: UpdateSkillStatusSchema,
            handler: skillController.updateStatus,
            auth: true
        }
    ],
};
