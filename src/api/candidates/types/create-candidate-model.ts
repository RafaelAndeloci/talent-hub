import { Candidate } from "./candidate";

type CreateCandidateDto = Omit<Candidate, 'id'>;

export default CreateCandidateDto;