import HTTPStatus from 'http-status';

import { jobApplicationBusiness } from './job-application-business';
import { JobApplicationController } from './types/job-application-controller';

export const jobApplicationController: JobApplicationController = {
    findById: async (req, res, next) => {
        try {
            const jobApplication = await jobApplicationBusiness.findById({
                jobApplicationId: req.params.id,
            });
            res.status(HTTPStatus.OK).json(jobApplication!);
        } catch (e) {
            next(e);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const result = await jobApplicationBusiness.findAll({
                query: req.query,
            });
            res.status(HTTPStatus.OK).json(result);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const jobApplication = await jobApplicationBusiness.create({
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.CREATED).json(jobApplication);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const jobApplication = await jobApplicationBusiness.update({
                jobApplicationId: req.params.id,
                payload: req.body,
            });
            res.status(HTTPStatus.OK).json(jobApplication);
        } catch (e) {
            next(e);
        }
    },

    remove: async (req, res, next) => {
        try {
            await jobApplicationBusiness.remove({ jobApplicationId: req.params.id });
            res.status(HTTPStatus.NO_CONTENT).send();
        } catch (e) {
            next(e);
        }
    },
};
