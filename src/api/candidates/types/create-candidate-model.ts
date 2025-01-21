import { Candidate } from './candidate';

type CreateCandidateDto = {
  payload: Omit<Candidate, 'id'>;
  userId: string;
};

export default CreateCandidateDto;
