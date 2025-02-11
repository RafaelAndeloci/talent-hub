import HTTPStatus from 'http-status';

import { jobOpeningBusiness } from './job-opening-business';
import { JobOpeningController } from '../../types/job-opening-controller';

export const jobOpeningController: JobOpeningController = {
    findById: async ({ params: { id: jobOpeningId } }, res) => {
        const jobOpening = await jobOpeningBusiness.findById({
            jobOpeningId,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },

    findAll: async ({ query }, res) => {
        const jobOpenings = await jobOpeningBusiness.findAll({
            query,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpenings);
    },

    create: async ({ body: payload }, res) => {
        const jobOpening = await jobOpeningBusiness.create({
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.CREATED).json(jobOpening);
    },

    update: async ({ params: { id: jobOpeningId }, body: payload }, res) => {
        const jobOpening = await jobOpeningBusiness.update({
            jobOpeningId,
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },

    remove: async ({ params: { id: jobOpeningId } }, res) => {
        await jobOpeningBusiness.remove({ jobOpeningId, context: res.locals });
        res.status(HTTPStatus.NO_CONTENT).send();
    },

    open: async ({ params: { id: jobOpeningId } }, res) => {
        const jobOpening = await jobOpeningBusiness.open({
            jobOpeningId,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },

    close: async ({ params: { id: jobOpeningId } }, res) => {
        const jobOpening = await jobOpeningBusiness.close({
            jobOpeningId,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },

    toDraft: async ({ params: { id: jobOpeningId } }, res) => {
        const jobOpening = await jobOpeningBusiness.toDraft({
            jobOpeningId,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },

    fill: async ({ params: { id: jobOpeningId }, body: payload }, res) => {
        const jobOpening = await jobOpeningBusiness.fill({
            jobOpeningId,
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    },
};
