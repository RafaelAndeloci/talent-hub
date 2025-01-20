import CompanyBusiness from './types/company-business';
import companyRepository from './company-repository';
import Company from './types/company';
import * as uuid from 'uuid';
import ApiError from '../../types/api-error';
import _ from 'lodash';
import prisma from '../../config/database';
import { JobOpportunityStatus } from '@prisma/client';

const companyBusiness: CompanyBusiness = {
  async create(payload) {
    const company = {
      ...payload,
      id: uuid.v4(),
    } as Company;

    await companyRepository.create(company);

    return company;
  },

  async update(id, payload) {
    const company = await companyRepository.findById(id);
    if (!company) {
      ApiError.throwBadRequest(`company with id ${id} not found`);
    }

    const updatedCompany = _.merge(company, payload) as Company;

    await companyRepository.update(updatedCompany);

    return updatedCompany;
  },

  async remove(id) {
    if (
      !(await companyRepository.exists({
        id,
      }))
    ) {
      ApiError.throwBadRequest(`company with id ${id} not found`);
    }

    await companyRepository.remove(id);
  },

  async findById(id) {
    const company = await companyRepository.findById(id);
    if (!company) {
      ApiError.throwBadRequest(`company with id ${id} not found`);
    }

    return company;
  },

  async findAll(params) {
    const { hasOppenedJobOpportunities, ...rest } = params;

    const companies = await companyRepository.findAll({
      ...rest,
      ...(_.isNil(hasOppenedJobOpportunities)
        ? {}
        : {
            where: {
              jobOpportunities: {
                some: {
                  status: JobOpportunityStatus.OPEN,
                },
              },
            } as any,
          }),
    });

    return companies;
  },
};

export default companyBusiness;