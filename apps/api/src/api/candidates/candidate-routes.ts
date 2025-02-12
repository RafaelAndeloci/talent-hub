import {
    CreateCandidateSchema,
    DeleteCandidateSchema,
    FindAllCandidatesSchema,
    FindCandidateByIdSchema,
    UpdateCandidateBannerSchema,
    UpdateCandidateCvSchema,
    UpdateCandidateSchema,
} from './candidate-schema';
import { candidateController } from './candidate-controller';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';

export const candidateRoutes: ApiResource = {
    resource: Resource.Candidates,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            action: Action.ReadAll,
            schema: FindAllCandidatesSchema,
            handler: candidateController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            action: Action.ReadById,
            schema: FindCandidateByIdSchema,
            handler: candidateController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            action: Action.Create,
            schema: CreateCandidateSchema,
            handler: candidateController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            action: Action.Update,
            schema: UpdateCandidateSchema,
            handler: candidateController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            action: Action.Delete,
            schema: DeleteCandidateSchema,
            handler: candidateController.remove,
        },
        {
            method: 'patch',
            path: '/:id/cv',
            auth: true,
            action: Action.candidateUpdateCv,
            schema: UpdateCandidateCvSchema,
            handler: candidateController.updateCv,
            middlewares: [singleFileUpload],
        },
        {
            method: 'patch',
            path: '/:id/banner',
            auth: true,
            action: Action.candidateSetBanner,
            schema: UpdateCandidateBannerSchema,
            handler: candidateController.updateBanner,
            middlewares: [singleFileUpload],
        },
    ],
};
