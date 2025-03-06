import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { ApiResource } from '../../types/api-resource';
import { CandidateApiSchema } from '@talent-hub/shared';
import { CandidateController } from './candidate-controller';

const candidateController = new CandidateController();

export const candidateRoutes: ApiResource = {
    resource: Resource.Candidates,
    routes: [
        {
            method: 'get',
            path: '/',
            auth: true,
            action: Action.ReadAll,
            schema: CandidateApiSchema.FindAll,
            handler: candidateController.findAll,
        },
        {
            method: 'get',
            path: '/:id',
            auth: true,
            action: Action.ReadById,
            schema: CandidateApiSchema.FindById,
            handler: candidateController.findById,
        },
        {
            method: 'post',
            path: '/',
            auth: true,
            action: Action.Create,
            schema: CandidateApiSchema.Create,
            handler: candidateController.create,
        },
        {
            method: 'put',
            path: '/:id',
            auth: true,
            action: Action.Update,
            schema: CandidateApiSchema.Update,
            handler: candidateController.update,
        },
        {
            method: 'delete',
            path: '/:id',
            auth: true,
            action: Action.Delete,
            schema: CandidateApiSchema.Remove,
            handler: candidateController.remove,
        },
        {
            method: 'patch',
            path: '/:id/cv',
            auth: true,
            action: Action.candidateUpdateCv,
            schema: CandidateApiSchema.SetCv,
            handler: candidateController.updateCv,
            middlewares: [singleFileUpload],
        },
        {
            method: 'patch',
            path: '/:id/banner',
            auth: true,
            action: Action.candidateSetBanner,
            schema: CandidateApiSchema.SetBanner,
            handler: candidateController.updateBanner,
            middlewares: [singleFileUpload],
        },
    ],
};
