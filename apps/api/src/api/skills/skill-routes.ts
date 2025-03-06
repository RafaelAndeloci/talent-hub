import { Action } from '../../enums/action';
import { Resource } from '../../enums/resource';
import { ApiResource } from '../../types/api-resource';
import { SkillApiSchema } from '@talent-hub/shared/schemas/skill';
import { SkillController } from './skill-controller';

const skillController = new SkillController();

export const skillResource: ApiResource = {
    resource: Resource.Skills,
    routes: [
        {
            path: '/',
            method: 'get',
            action: Action.ReadAll,
            schema: SkillApiSchema.FindAll,
            handler: skillController.findAll,
            auth: true,
        },
        {
            path: '/:id',
            method: 'get',
            action: Action.ReadById,
            schema: SkillApiSchema.FindById,
            handler: skillController.findById,
            auth: true,
        },
        {
            path: '/',
            method: 'post',
            action: Action.Create,
            schema: SkillApiSchema.Create,
            handler: skillController.create,
            auth: true,
        },
        {
            path: '/:id',
            method: 'put',
            action: Action.Update,
            schema: SkillApiSchema.Update,
            handler: skillController.update,
            auth: true,
        },
        {
            path: '/:id',
            method: 'delete',
            action: Action.Delete,
            schema: SkillApiSchema.Remove,
            handler: skillController.remove,
            auth: true,
        },
        {
            path: '/:id/status',
            method: 'patch',
            action: Action.skillUpdateStatus,
            schema: SkillApiSchema.UpdateStatus,
            handler: skillController.updateStatus,
            auth: true,
        },
    ],
};
