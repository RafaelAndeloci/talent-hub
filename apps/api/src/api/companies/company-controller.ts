import HTTPStatus from 'http-status';

import { companyBusiness } from './company-business';
import { CompanyController } from './types/company-controller';

export const companyController: CompanyController = {
    findById: async (req, res, next) => {
        try {
            const company = await companyBusiness.findById({
                companyId: req.params.id,
                context: res.locals,
            });

            res.status(HTTPStatus.OK).json(company);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const companies = await companyBusiness.findAll({
                query: req.query,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(companies);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const company = await companyBusiness.create({
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.CREATED).json(company);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const company = await companyBusiness.update({
                companyId: req.params.id,
                payload: req.body,
                context: res.locals,
            });
            res.status(HTTPStatus.OK).json(company);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await companyBusiness.remove({ companyId: req.params.id, context: res.locals });
            res.sendStatus(HTTPStatus.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    },
};
