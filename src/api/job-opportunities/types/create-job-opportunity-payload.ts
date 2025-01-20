import JobOpportunity from './job-opportunity';

type CreateJobOpportunityPayload = Omit<JobOpportunity, 'id'>;

export default CreateJobOpportunityPayload;