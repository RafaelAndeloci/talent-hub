// import HTTPStatus from 'http-status';

// import { candidateBusiness } from './candidate-business';
// import { ApiError } from '../../types/api-error';
// import { CandidateController } from '../../types/candidate-controller';

// export const candidateController: CandidateController = {
//     findAll: async ({ query }, res) => {
//         const candidates = await candidateBusiness.findAll({ query });
//         res.status(HTTPStatus.OK).json(candidates);
//     },

//     findById: async ({ params: { id } }, res) => {
//         const candidate = await candidateBusiness.findById(id);
//         res.status(HTTPStatus.OK).json(candidate);
//     },

//     create: async ({ body: payload }, res) => {
//         const candidate = await candidateBusiness.create({
//             userId: res.locals.user.id,
//             payload,
//         });
//         res.status(HTTPStatus.CREATED).json(candidate);
//     },

//     update: async ({ params: { id: candidateId }, body: payload }, res) => {
//         const candidate = await candidateBusiness.update({
//             candidateId,
//             payload,
//         });
//         res.status(HTTPStatus.OK).json(candidate);
//     },

//     remove: async ({ params: { id } }, res) => {
//         await candidateBusiness.remove(id);
//         res.sendStatus(HTTPStatus.NO_CONTENT);
//     },

//     updateCv: async ({ params: { id: candidateId }, file: { buffer, mimetype } = {} }, res) => {
//         const candidate = await candidateBusiness.updateCv({
//             candidateId,
//             file: {
//                 content: buffer!,
//                 mimetype: mimetype!,
//             },
//         });
//         res.status(HTTPStatus.OK).json(candidate!);
//     },

//     updateBanner: async (req, res, next) => {
//         try {
//             const {
//                 params: { id: candidateId },
//                 file: { mimetype, buffer } = {},
//             } = req;
//             if (!mimetype || !buffer) {
//                 ApiError.throwBadRequest('file is required');
//                 return;
//             }

//             const candidate = await candidateBusiness.updateBanner({
//                 candidateId,
//                 file: {
//                     content: buffer,
//                     mimetype,
//                 },
//             });

//             res.status(HTTPStatus.OK).json(candidate);
//         } catch (error) {
//             next(error);
//         }
//     },
// };

import {
    Candidate,
    CandidateDto,
    CandidatePayload,
    PagedResponse,
    QueryArgs,
    UserDto,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';
import { CandidateBusiness } from './candidate-business';
import HTTPStatus from 'http-status';

export class CandidateController {
    public constructor(private candidateBusiness = new CandidateBusiness()) {}

    findAll: RequestHandler<{}, PagedResponse<CandidateDto>, {}, QueryArgs<Candidate>, {}> = async (
        { query },
        res,
    ) => {
        const candidates = await this.candidateBusiness.findAll(query);
        res.status(HTTPStatus.OK).json(candidates);
    };

    findById: RequestHandler<{ id: string }, CandidateDto, {}, {}, {}> = async (
        { params: { id } },
        res,
    ) => {
        const candidate = await this.candidateBusiness.findById(id);
        res.status(HTTPStatus.OK).json(candidate);
    };

    create: RequestHandler<{}, CandidateDto, Candidate, {}, UserDto> = async (
        { body: payload },
        res,
    ) => {
        const candidate = await this.candidateBusiness.create({
            userId: res.locals.id,
            payload,
        });
        res.status(HTTPStatus.CREATED).json(candidate);
    };

    update: RequestHandler<{ id: string }, CandidateDto, CandidatePayload, {}, {}> = async (
        { params: { id: candidateId }, body: payload },
        res,
    ) => {
        const candidate = await this.candidateBusiness.update({
            candidateId,
            payload,
        });
        res.status(HTTPStatus.OK).json(candidate);
    };

    remove: RequestHandler<{ id: string }, void, {}, {}, {}> = async ({ params: { id } }, res) => {
        await this.candidateBusiness.remove(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    };

    updateCv: RequestHandler<{ id: string }, CandidateDto, {}, {}> = async (req, res) => {
        const {
            params: { id: candidateId },
            file: { buffer, mimetype } = {},
        } = req;
        const candidate = await this.candidateBusiness.updateCv({
            candidateId,
            file: {
                content: buffer!,
                mimetype: mimetype!,
            },
        });

        res.status(HTTPStatus.OK).json(candidate);
    };

    updateBanner: RequestHandler<{ id: string }, CandidateDto, {}, {}, {}> = async (req, res, next) => {
        try {
            const {
                params: { id: candidateId },
                file: { mimetype, buffer } = {},
            } = req;
            if (!mimetype || !buffer) {
                throw new Error('file is required');
            }

            const candidate = await this.candidateBusiness.updateBanner({
                candidateId,
                file: {
                    content: buffer,
                    mimetype,
                },
            });

            res.status(HTTPStatus.OK).json(candidate);
        } catch (error) {
            next(error);
        }
    };
}
