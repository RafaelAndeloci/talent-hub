import FindAllProps from '../../../types/find-all-props';
import JobApplication from './job-application';

type FindAllJobApplicationsArgs = FindAllProps<
  Pick<
    JobApplication,
    | 'id'
    | 'status'
    | 'appliedAt'
    | 'candidateId'
    | 'jobOpportunityId'
    | 'updatedBy'
  >
>;

export default FindAllJobApplicationsArgs;
