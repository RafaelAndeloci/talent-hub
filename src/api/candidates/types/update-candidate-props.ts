import { Candidate } from './candidate';

type UpdateCandidateProps = {
  id: string;
  payload: Partial<Omit<Candidate, 'id'>>;
};

export default UpdateCandidateProps;
