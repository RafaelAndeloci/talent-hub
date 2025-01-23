import * as uuid from 'uuid'
import { CreateCandidateDto } from './types/dtos/create-candidate-dto'
import { userRepository } from '../users/user-repository'
import { ApiError } from '../../shared/types/api-error'
import { candidateRepository } from './candidate-repository'
import { CandidateDto } from './types/dtos/candidate-dto'
import { userBusiness } from '../users/user-business'
import { Candidate } from './types/entities/candidate'

type CreateCandidateArgs = {
  userId: string
  payload: CreateCandidateDto
}

const create = async ({ userId, payload }: CreateCandidateArgs) => {
  const user = await userRepository.findById(userId)
  if (!user) {
    ApiError.throwNotFound('User not found')
  }

  if (!userBusiness.isActive(user!)) {
    ApiError.throwForbidden('User is not active')
  }

  if (!userBusiness.canCreateCandidate(user!)) {
    ApiError.throwForbidden('User cannot create candidate')
  }

  const newCandidate: Candidate = {
    ...payload,
    userId,
    id: uuid.v4(),
    cvUrl: null,
    bannerUrl: null,
  }

  await candidateRepository.create(newCandidate)

  return newCandidate as CandidateDto
}

export const candidateBusiness = Object.freeze({
  create,
})
