import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateCompanySchema,
    DeleteCompanySchema,
    FindAllCompaniesSchema,
    FindCompanyByIdSchema,
    UpdateCompanySchema,
} from './company-schema';
import { companyController } from './company-controller';
import { ApiResource } from '../../types/api-resource';

export const companyRoutes: ApiResource = {
    resource: Resource.companies,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllCompaniesSchema,
            action: Action.readAll,
            handler: companyController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindCompanyByIdSchema,
            action: Action.readById,
            handler: companyController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateCompanySchema,
            action: Action.create,
            handler: companyController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: UpdateCompanySchema,
            action: Action.update,
            handler: companyController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: DeleteCompanySchema,
            action: Action.delete,
            handler: companyController.remove,
        },
    ],
};
