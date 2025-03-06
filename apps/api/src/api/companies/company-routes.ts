import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { CompanyController } from './company-controller';
import { CompanyApiSchema } from '@talent-hub/shared';

const companyController = new CompanyController();

export const companyRoutes: ApiResource = {
    resource: Resource.Companies,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: CompanyApiSchema.FindAll,
            action: Action.ReadAll,
            handler: companyController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: CompanyApiSchema.FindById,
            action: Action.ReadById,
            handler: companyController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            schema: CompanyApiSchema.Create,
            action: Action.Create,
            handler: companyController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            schema: CompanyApiSchema.Update,
            action: Action.Update,
            handler: companyController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: CompanyApiSchema.Remove,
            action: Action.Delete,
            handler: companyController.remove,
        },
        {
            method: 'patch',
            path: '/:id/banner',
            auth: true,
            action: Action.companySetBanner,
            schema: CompanyApiSchema.SetBanner,
            middlewares: [singleFileUpload],
            handler: companyController.setBanner,
        },
        {
            method: 'patch',
            path: '/:id/logo',
            auth: true,
            action: Action.companySetLogo,
            schema: CompanyApiSchema.SetLogo,
            middlewares: [singleFileUpload],
            handler: companyController.setLogo,
        },
        {
            method: 'patch',
            path: '/:id/gallery/:order',
            auth: true,
            action: Action.companySetGallery,
            schema: CompanyApiSchema.SetGalleryItem,
            middlewares: [singleFileUpload],
            handler: companyController.setGalleryItem,
        },
        {
            method: 'delete',
            path: '/:id/gallery/:order?',
            auth: true,
            action: Action.companyDeleteGallery,
            schema: CompanyApiSchema.RemoveGalleryItem,
            handler: companyController.deleteGalleryItem,
        },
    ],
};
