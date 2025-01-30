import HTTPStatus from 'http-status';

import { jobOpeningBusiness } from './job-opening-business';
import { JobOpeningController } from './types/job-opening-controller';

export const jobOpeningController: JobOpeningController = {
    findById: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.findById({
                jobOpeningId: req.params.id,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const jobOpenings = await jobOpeningBusiness.findAll({
                query: req.query,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpenings);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.create({
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.CREATED).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.update({
                jobOpeningId: req.params.id,
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await jobOpeningBusiness.remove({ jobOpeningId: req.params.id, context: res.locals });
            res.status(HTTPStatus.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    },

    open: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.open({
                jobOpeningId: req.params.id,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    close: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.close({
                jobOpeningId: req.params.id,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    toDraft: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.toDraft({
                jobOpeningId: req.params.id,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },

    fill: async (req, res, next) => {
        try {
            const jobOpening = await jobOpeningBusiness.fill({
                jobOpeningId: req.params.id,
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(jobOpening);
        } catch (error) {
            next(error);
        }
    },
};
