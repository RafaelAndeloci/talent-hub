import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateCompanySchema,
    DeleteCompanySchema,
    FindAllCompaniesSchema,
    FindCompanyByIdSchema,
    RemoveGalleryItemSchema,
    SetBannerSchema,
    SetGaleryItemSchema,
    SetLogoSchema,
    UpdateCompanySchema,
} from './company-schema';
import { companyController } from './company-controller';
import { ApiResource } from '../../types/api-resource';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';

export const companyRoutes: ApiResource = {
    resource: Resource.Companies,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllCompaniesSchema,
            action: Action.ReadAll,
            handler: companyController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindCompanyByIdSchema,
            action: Action.ReadById,
            handler: companyController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CreateCompanySchema,
            action: Action.Create,
            handler: companyController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: UpdateCompanySchema,
            action: Action.Update,
            handler: companyController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: DeleteCompanySchema,
            action: Action.Delete,
            handler: companyController.remove,
        },
        {
            method: 'patch',
            path: '/:id/banner',
            auth: true,
            action: Action.companySetBanner,
            schema: SetBannerSchema,
            middlewares: [singleFileUpload],
            handler: companyController.setBanner,
        },
        {
            method: 'patch',
            path: '/:id/logo',
            auth: true,
            action: Action.companySetLogo,
            schema: SetLogoSchema,
            middlewares: [singleFileUpload],
            handler: companyController.setLogo,
        },
        {
            method: 'patch',
            path: '/:id/gallery/:order',
            auth: true,
            action: Action.companySetGallery,
            schema: SetGaleryItemSchema,
            middlewares: [singleFileUpload],
            handler: companyController.setGalleryItem,
        },
        {
            method: 'delete',
            path: '/:id/gallery/:order?',
            auth: true,
            action: Action.companyDeleteGallery,
            schema: RemoveGalleryItemSchema,
            handler: companyController.deleteGalleryItem,
        },
    ],
};
