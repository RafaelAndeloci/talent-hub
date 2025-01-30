import HTTPStatus from 'http-status';

import { candidateBusiness } from './candidate-business';
import { ApiError } from '../../types/api-error';
import { CandidateController } from './types/candidate-controller';

export const candidateController: CandidateController = {
    create: async (req, res, next) => {
        try {
            const candidate = await candidateBusiness.create({
                userId: res.locals.user.id,
                payload: {
                    ...req.body,
                },
            });

            res.status(HTTPStatus.CREATED).json(candidate);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const candidate = await candidateBusiness.update({
                candidateId: req.params.id,
                payload: req.body,
            });

            res.status(HTTPStatus.OK).json(candidate);
        } catch (error) {
            next(error);
        }
    },

    findById: async (req, res, next) => {
        try {
            const candidate = await candidateBusiness.findById(req.params.id);

            res.status(HTTPStatus.OK).json(candidate);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const candidates = await candidateBusiness.findAll(req.query);

            res.status(HTTPStatus.OK).json(candidates);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await candidateBusiness.remove(req.params.id);
            res.sendStatus(HTTPStatus.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    },

    updateCv: async (req, res, next) => {
        try {
            const {
                params: { id: candidateId },
                file: { mimetype, buffer } = {},
            } = req;
            if (!mimetype || !buffer) {
                ApiError.throwBadRequest('file is required');
                return;
            }

            const candidate = await candidateBusiness.updateCv({
                candidateId,
                file: {
                    content: buffer,
                    mimetype,
                },
            });

            res.status(HTTPStatus.OK).json(candidate!);
        } catch (error) {
            next(error);
        }
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
