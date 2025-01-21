import FindAllProps from '../../../types/find-all-props';
import Company from './company';

type FindAllCompanies = FindAllProps<Company> & {
  hasOppenedJobOpportunities?: boolean;
};

export default FindAllCompanies;
