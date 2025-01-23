import { Candidate } from '../entities/candidate'

export type CandidateDto = Omit<Candidate, 'userId'>
