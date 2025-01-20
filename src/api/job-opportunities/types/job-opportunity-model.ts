import { JobOpportunity, JobOpportunityDesiredLanguage } from '@prisma/client';

export type JobOpportunityDesiredLanguageModel = JobOpportunityDesiredLanguage;

type JobOpportunityModel = JobOpportunity & {
  desiredLanguages: JobOpportunityDesiredLanguageModel[];
};

export default JobOpportunityModel;
