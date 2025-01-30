import { Op } from 'sequelize';
import * as uuid from 'uuid';

import { ApiError } from '../../types/api-error';
import { Role } from '../users/types/enums/role';
import { companyRepository } from './company-repository';
import { Company } from './types/company';
import { CompanyBusiness } from './types/company-business';
import { companyParser } from './company-parser';
import _ from 'lodash';

export const companyBusiness: CompanyBusiness = {
    findById: async ({ companyId, context }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${company} not found`);
            return null!;
        }

        return companyParser.toDto({ company, userRole: context.user.role });
    },

    findAll: async ({ query, context }) => {
        const companies = await companyRepository.findAll(query);
        return companies.parse((company) =>
            companyParser.toDto({ company, userRole: context.user.role }),
        );
    },

    create: async ({ payload }) => {
        const existing = await companyRepository.findUnique({
            [Op.or]: [{ cnpj: payload.cnpj }, { legalName: payload.legalName }],
        });
        if (existing) {
            ApiError.throwConflict('company already exists');
        }

        const company: Company = {
            id: uuid.v4(),
            ...payload,
        };

        await companyRepository.create(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },

    update: async ({ companyId, payload }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
            return null!;
        }

        const updated = _.merge(company, payload);
        await companyRepository.update(updated);

        return companyParser.toDto({ company: updated, userRole: Role.companyAdmin });
    },

    remove: async ({ companyId }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        await companyRepository.deleteById(companyId);
    },
};
