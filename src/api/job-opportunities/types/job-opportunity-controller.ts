import { Request, Response, NextFunction } from 'express';
import JobOpportunity from './job-opportunity';
import FindAllJobOpportunitiesArgs from './find-all-job-opportunities-args';
import PagedList from '../../../types/paged-list';
import CreateJobOpportunityPayload from './create-job-opportunity-payload';
import UpdateJobOpportunityPayload from './update-job-opportunity-payload';

export default interface JobOpportunityController {
  findById(
    req: Request<{ id: string }>,
    res: Response<JobOpportunity>,
    next: NextFunction
  ): Promise<void>;

  findAll(
    req: Request<void, void, void, FindAllJobOpportunitiesArgs>,
    res: Response<PagedList<JobOpportunity>>,
    next: NextFunction
  ): Promise<void>;

  create(
    req: Request<void, void, CreateJobOpportunityPayload>,
    res: Response<JobOpportunity>,
    next: NextFunction
  ): Promise<void>;

  update(
    req: Request<{ id: string }, void, UpdateJobOpportunityPayload>,
    res: Response<JobOpportunity>,
    next: NextFunction
  ): Promise<void>;

  remove(
    req: Request<{ id: string }>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void>;
}
