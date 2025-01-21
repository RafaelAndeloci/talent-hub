import { Request, Response } from 'express';
import JobApplyPayload from './job-apply-payload';
import JobApplicationUpdateFeedbackPayload from './job-application-update-feedback-payload';
import JobApplication from './job-application';
import PagedList from '../../../types/paged-list';
import FindAllJobApplicationsArgs from './find-all-job-application-args';
import JobApplicationUpdatePayload from './job-application-update-payload';

export default interface JobApplicationController {
  apply(
    req: Request<void, void, Omit<JobApplyPayload, 'userId'>>,
    res: Response,
  ): Promise<void>;

  updateFeeback(
    req: Request<
      { id: string },
      void,
      Omit<JobApplicationUpdateFeedbackPayload, 'jobApplicationId' | 'userId'>
    >,
    res: Response,
  ): Promise<void>;

  update(
    req: Request<
      { id: string },
      void,
      Omit<JobApplicationUpdatePayload, 'id' | 'userId'>
    >,
    res: Response<JobApplication>,
  ): Promise<void>;

  remove(req: Request<{ id: string }>, res: Response): Promise<void>;

  findById(
    req: Request<{ id: string }>,
    res: Response<JobApplication>,
  ): Promise<void>;

  findAll(
    req: Request<void, void, void, FindAllJobApplicationsArgs>,
    res: Response<PagedList<JobApplication>>,
  ): Promise<void>;
}
