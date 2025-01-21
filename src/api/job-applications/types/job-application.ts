import { JobApplicationFeedback as JobApplicationFeedbackModel } from '@prisma/client';
import JobApplicationModel from './job-application-model';

export type JobApplicationFeedback = Omit<JobApplicationFeedbackModel, 'id'>;

type JobApplication = Omit<
  JobApplicationModel,
  'deletedAt' | 'updatedAt' | 'feedbackHistory'
> & {
  feedbackHistory: JobApplicationFeedback[];
};

export default JobApplication;
