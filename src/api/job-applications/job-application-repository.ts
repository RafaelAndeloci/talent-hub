import repositoryFactory from '../../services/repository-factory';
import JobApplicationModel from './types/job-application-model';
import * as uuid from 'uuid';

const jobApplicationRepository =
  repositoryFactory.buildFor<JobApplicationModel>({
    modelName: 'JobApplication',
    toCreateTransform: jobApplication => ({
      ...jobApplication,
      feedbacksHistory: {
        create: jobApplication.feedbacksHistory,
      },
    }),
    toUpdateTransform: jobApplication => ({
      ...jobApplication,
      feedbacksHistory: {
        deleteMany: {
          id: {
            notIn: jobApplication.feedbacksHistory.map((f: any) => f.id),
          },
        },
        upsert: jobApplication.feedbacksHistory.map((f: any) => {
          delete f.jobApplicationId;
          f.id = f.id || uuid.v4();

          return {
            where: { id: f.id },
            create: f,
            update: f,
          };
        }),
      },
    }),
  });

export default jobApplicationRepository;
