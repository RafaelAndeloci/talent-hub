import PagedList from '../../../types/paged-list';
import CreateJobOpportunityPayload from './create-job-opportunity-payload';
import FindAllJobOpportunitiesArgs from './find-all-job-opportunities-args';
import JobOpportunity from './job-opportunity';
import UpdateJobOpportunityPayload from './update-job-opportunity-payload';

export default interface JobOpportunityBusiness {
  create(payload: CreateJobOpportunityPayload): Promise<JobOpportunity>;

  update(
    id: string,
    payload: UpdateJobOpportunityPayload,
  ): Promise<JobOpportunity>;

  remove(id: string): Promise<void>;

  findAll(args: FindAllJobOpportunitiesArgs): Promise<PagedList<JobOpportunity>>;

  findById(id: string): Promise<JobOpportunity>;
}
