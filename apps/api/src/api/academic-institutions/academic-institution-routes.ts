import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { AcademicInstitutionApiSchema } from '@talent-hub/shared';
import AcademicInstitutionController from './academic-institution-controller';

const academicInstitutionController = new AcademicInstitutionController();

export const AcademicInstitutionRoutes: ApiResource = {
    resource: Resource.AcademicInstitutions,
    routes: [
        {
            action: Action.ReadById,
            method: 'get',
            auth: true,
            path: '/:id',
            handler: academicInstitutionController.findById,
            schema: AcademicInstitutionApiSchema.FindById,
        },
        {
            action: Action.ReadAll,
            method: 'get',
            auth: true,
            path: '/',
            handler: academicInstitutionController.findAll,
            schema: AcademicInstitutionApiSchema.FindAll,
        },
        {
            action: Action.Create,
            method: 'post',
            auth: true,
            path: '/',
            handler: academicInstitutionController.create,
            schema: AcademicInstitutionApiSchema.Create,
        },
        {
            action: Action.Update,
            method: 'put',
            auth: true,
            path: '/:id',
            handler: academicInstitutionController.update,
            schema: AcademicInstitutionApiSchema.Update,
        },
        {
            action: Action.Delete,
            method: 'delete',
            auth: true,
            path: '/:id',
            handler: academicInstitutionController.remove,
            schema: AcademicInstitutionApiSchema.Remove,
        },
    ],
};
