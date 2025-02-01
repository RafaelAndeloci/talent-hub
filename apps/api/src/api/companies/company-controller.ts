import HTTPStatus from 'http-status';

import { companyBusiness } from './company-business';
import { CompanyController } from './types/company-controller';

export const companyController: CompanyController = {
    findById: async ({ params: { id: companyId } }, res) => {
        const company = await companyBusiness.findById({
            companyId,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(company);
    },

    findAll: async ({ query }, res) => {
        const companies = await companyBusiness.findAll({
            query,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(companies);
    },

    create: async ({ body: payload }, res) => {
        const company = await companyBusiness.create({
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.CREATED).json(company);
    },

    update: async ({ params: { id: companyId }, body: payload }, res) => {
        const company = await companyBusiness.update({
            companyId,
            payload,
            context: res.locals,
        });
        res.status(HTTPStatus.OK).json(company);
    },

    remove: async ({ params: { id: companyId } }, res) => {
        await companyBusiness.remove({ companyId, context: res.locals });
        res.sendStatus(HTTPStatus.NO_CONTENT);
    },
};
