import { Candidate } from '../entities/candidate'

export type UpdateCandidateDto = Partial<Omit<Candidate, 'id'>>
