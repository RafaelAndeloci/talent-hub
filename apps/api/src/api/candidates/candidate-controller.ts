import HTTPStatus from 'http-status';

import { candidateBusiness } from './candidate-business';
import { ApiError } from '../../types/api-error';
import { CandidateController } from '../../types/candidate-controller';

export const candidateController: CandidateController = {
    findAll: async ({ query }, res) => {
        const candidates = await candidateBusiness.findAll({ query });
        res.status(HTTPStatus.OK).json(candidates);
    },

    findById: async ({ params: { id } }, res) => {
        const candidate = await candidateBusiness.findById(id);
        res.status(HTTPStatus.OK).json(candidate);
    },

    create: async ({ body: payload }, res) => {
        const candidate = await candidateBusiness.create({
            userId: res.locals.user.id,
            payload,
        });
        res.status(HTTPStatus.CREATED).json(candidate);
    },

    update: async ({ params: { id: candidateId }, body: payload }, res) => {
        const candidate = await candidateBusiness.update({
            candidateId,
            payload,
        });
        res.status(HTTPStatus.OK).json(candidate);
    },

    remove: async ({ params: { id } }, res) => {
        await candidateBusiness.remove(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    },

    updateCv: async ({ params: { id: candidateId }, file: { buffer, mimetype } = {} }, res) => {
        const candidate = await candidateBusiness.updateCv({
            candidateId,
            file: {
                content: buffer!,
                mimetype: mimetype!,
            },
        });
        res.status(HTTPStatus.OK).json(candidate!);
    },

    updateBanner: async (req, res, next) => {
        try {
            const {
                params: { id: candidateId },
                file: { mimetype, buffer } = {},
            } = req;
            if (!mimetype || !buffer) {
                ApiError.throwBadRequest('file is required');
                return;
            }

            const candidate = await candidateBusiness.updateBanner({
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
    },
};
