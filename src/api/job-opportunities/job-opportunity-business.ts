import JobOpportunityBusiness from './types/job-opportunity-business';
import jobOpportunityRepository from './job-opportunity-repository';
import ApiError from '../../types/api-error';
import JobOpportunity from './types/job-opportunity';
import * as uuid from 'uuid';
import { JobOpportunityDesiredLanguageModel } from './types/job-opportunity-model';

const jobOpportunityBusiness: JobOpportunityBusiness = {
  async create(payload) {
    if (
      await jobOpportunityRepository.exists({
        title: payload.title,
        companyId: payload.companyId,
      })
    ) {
      ApiError.throwConflict('Job opportunity already exists');
    }

    const jobOpportunity = {
      id: uuid.v4(),
      ...payload,
    } as JobOpportunity;

    await jobOpportunityRepository.create(jobOpportunity);

    return jobOpportunity;
  },

  async update(id, payload) {
    const jobOpportunity = await jobOpportunityRepository.findById(id);
    if (!jobOpportunity) {
      ApiError.throwNotFound(`job opportunity with id ${id} not found`);
    }

    const updatedJobOpportunity = {
      ...jobOpportunity,
      ...payload,
      desiredLanguages: (payload.desiredLanguages || []).map(language => {
        const existing =
          jobOpportunity.desiredLanguages.find(
            l => l.language === language.language,
          ) ?? ({} as JobOpportunityDesiredLanguageModel);

        return {
          ...existing,
          ...language,
          id: existing.id || uuid.v4(),
        };
      }),
    } as JobOpportunity;

    await jobOpportunityRepository.update(updatedJobOpportunity);

    return updatedJobOpportunity;
  },

  async remove(id) {
    if (
      !(await jobOpportunityRepository.exists({
        id,
      }))
    ) {
      ApiError.throwNotFound(`job opportunity with id ${id} not found`);
    }

    await jobOpportunityRepository.remove(id);
  },

  async findById(id) {
    const jobOpportunity = await jobOpportunityRepository.findById(id);
    if (!jobOpportunity) {
      ApiError.throwNotFound(`job opportunity with id ${id} not found`);
    }

    return jobOpportunity;
  },

  async findAll(args) {
    const jobOpportunities = await jobOpportunityRepository.findAll(args);
    return jobOpportunities;
  },
};

export default jobOpportunityBusiness;