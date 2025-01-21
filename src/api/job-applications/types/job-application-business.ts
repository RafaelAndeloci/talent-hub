import PagedList from '../../../types/paged-list';
import FindAllJobApplicationsArgs from './find-all-job-application-args';
import JobApplication from './job-application';
import JobApplicationUpdateFeedbackPayload from './job-application-update-feedback-payload';
import JobApplicationUpdatePayload from './job-application-update-payload';
import JobApplyPayload from './job-apply-payload';

export default interface JobApplicationBusiness {
  apply: (payload: JobApplyPayload) => Promise<JobApplication>;

  update: (payload: JobApplicationUpdatePayload) => Promise<JobApplication>;

  remove: (id: string) => Promise<void>;

  updateFeedback: (
    payload: JobApplicationUpdateFeedbackPayload,
  ) => Promise<JobApplication>;

  findById: (id: string) => Promise<JobApplication>;

  findAll: (args: FindAllJobApplicationsArgs) => Promise<PagedList<JobApplication>>;

  isCanceled: (jobApplication: JobApplication) => boolean;
}
