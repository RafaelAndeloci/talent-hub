import CandidateDtoProps from './candidate-dto-props';
import FindAllProps from '../../../types/find-all-props';
import PagedList from '../../../types/paged-list';
import CreateCandidateProps from './create-candidate-props';
import UpdateCandidateProps from './update-candidate-props';

type CandidateBusiness = {
  findById: (id: string) => Promise<CandidateDtoProps>;
  findAll: (
    props: FindAllProps<CandidateDtoProps>,
  ) => Promise<PagedList<CandidateDtoProps>>;
  create: (payload: CreateCandidateProps) => Promise<CandidateDtoProps>;
  update: (props: UpdateCandidateProps) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export default CandidateBusiness;
