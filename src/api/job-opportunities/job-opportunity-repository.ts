import repositoryFactory from '../../services/repository-factory';
import JobOpportunityModel from './types/job-opportunity-model';

const jobOpportunityRepository =
  repositoryFactory.buildFor<JobOpportunityModel>({
    modelName: 'JobOpportunity',
    inclusions: {
      desiredLanguages: true,
    },
    toUpdateTransform: (jobOpportunity: any) => ({
      ...jobOpportunity,
      desiredLanguages: {
        deleteMany: {
          id: {
            notIn: jobOpportunity.desiredLanguages.map((l: any) => l.id),
          },
        },
        upsert: jobOpportunity.desiredLanguages.map((l: any) => ({
          where: {
            AND: {
              language: l.language,
              jobOpportunityId: jobOpportunity.id,
            },
          },
          create: l,
          update: l,
        })),
      },
    }),
    toCreateTransform: (jobOpportunity: any) => ({
      ...jobOpportunity,
      desiredLanguages: {
        create: jobOpportunity.desiredLanguages,
      },
    }),
  });

export default jobOpportunityRepository;
