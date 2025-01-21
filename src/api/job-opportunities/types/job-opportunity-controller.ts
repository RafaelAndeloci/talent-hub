import { Request, Response } from 'express';
import JobOpportunity from './job-opportunity';
import FindAllJobOpportunitiesArgs from './find-all-job-opportunities-args';
import PagedList from '../../../types/paged-list';
import CreateJobOpportunityPayload from './create-job-opportunity-payload';
import UpdateJobOpportunityPayload from './update-job-opportunity-payload';

export default interface JobOpportunityController {
  findById(
    req: Request<{ id: string }>,
    res: Response<JobOpportunity>,
  ): Promise<void>;

  findAll(
    req: Request<void, void, void, FindAllJobOpportunitiesArgs>,
    res: Response<PagedList<JobOpportunity>>,
  ): Promise<void>;

  create(
    req: Request<void, void, CreateJobOpportunityPayload>,
    res: Response<JobOpportunity>,
  ): Promise<void>;

  update(
    req: Request<{ id: string }, void, UpdateJobOpportunityPayload>,
    res: Response<JobOpportunity>,
  ): Promise<void>;

  remove(req: Request<{ id: string }>, res: Response<void>): Promise<void>;
}
