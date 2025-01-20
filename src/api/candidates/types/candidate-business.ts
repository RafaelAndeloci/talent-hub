import FindAllProps from '../../../types/find-all-props';
import PagedList from '../../../types/paged-list';
import { Candidate } from './candidate';
import CreateCandidateDto from './create-candidate-model';
import UpdateCandidateProps from './update-candidate-props';

type CandidateBusiness = {
  findById: (id: string) => Promise<Candidate>;
  findAll: (
    props: FindAllProps<Candidate>,
  ) => Promise<PagedList<Candidate>>;
  create: (payload: CreateCandidateDto) => Promise<Candidate>;
  update: (props: UpdateCandidateProps) => Promise<Candidate>;
  remove: (id: string) => Promise<void>;
};

export default CandidateBusiness;
