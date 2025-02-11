import { Candidate } from './candidate';

export type CandidateDto = Omit<Candidate, 'userId'>;
