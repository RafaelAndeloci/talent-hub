import { Candidate } from './candidate';

export type CreateCandidatePayload = Omit<Candidate, 'id' | 'userId'>;
