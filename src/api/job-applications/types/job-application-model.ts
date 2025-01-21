import { JobApplication, JobApplicationFeedback } from '@prisma/client';

export type JobApplicationFeedbackModel = JobApplicationFeedback;

type JobApplicationModel = JobApplication & {
  feedbackHistory: JobApplicationFeedbackModel[];
};

export default JobApplicationModel;
