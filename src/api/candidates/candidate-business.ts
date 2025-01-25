import { CreateCandidateDto } from './types/dtos/create-candidate-dto'
import { userRepository } from '../users/user-repository'
import { ApiError } from '../../shared/types/api-error'
import { candidateRepository } from './candidate-repository'
import { userBusiness } from '../users/user-business'
import { UpdateCandidateDto } from './types/dtos/update-candidate-dto'
import { merge, newInstance } from './candidate-parser'

const create = async ({
  userId,
  payload,
}: {
  userId: string
  payload: CreateCandidateDto
}) => {
  const user = await userRepository.findById(userId)
  if (!user) {
    ApiError.throwNotFound('User not found')
  }

  if (!userBusiness.canCreateCandidate(user!)) {
    ApiError.throwForbidden('User cannot create candidate')
  }

  const candidate = newInstance(payload)

  await candidateRepository.create({
    ...candidate,
    userId,
  })

  return candidate
}

const update = async ({
  candidateId,
  payload,
}: {
  candidateId: string
  payload: UpdateCandidateDto
}) => {
  const candidate = await candidateRepository.findById(candidateId)
  if (!candidate) {
    ApiError.throwNotFound('Candidate not found')
  }

  const updated = merge(candidate!, payload)
  await candidateRepository.update(updated)

  return updated
}

const findById = async (id: string) => {
  const candidate = await candidateRepository.findById(id)
  if (!candidate) {
    ApiError.throwNotFound('Candidate not found')
  }

  return candidate!
}

export const candidateBusiness = {
  create,
  update,
  findById,
}
