import { CandidateModel, CandidateModelAttr } from './models/candidate-model'
import { makeRepository } from '../../shared/services/repository'
import { Candidate } from './types/entities/candidate'
import { fromDatabase, toDatabase } from './candidate-parser'

export const candidateRepository = makeRepository<
  Candidate & { userId?: string },
  CandidateModelAttr,
  CandidateModel
>({
  model: CandidateModel,
  toDatabase,
  fromDatabase,
})
