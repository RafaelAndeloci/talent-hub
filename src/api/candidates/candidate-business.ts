import { CreateCandidateDto } from './types/dtos/create-candidate-dto'
import { userRepository } from '../users/user-repository'
import { ApiError } from '../../shared/types/api-error'
import { candidateRepository } from './candidate-repository'
import { userBusiness } from '../users/user-business'
import { UpdateCandidateDto } from './types/dtos/update-candidate-dto'
import { merge, newInstance } from './candidate-parser'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { Candidate } from './types/entities/candidate'

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

const findAll = async (query: FindAllArgs<Candidate>) => {
  const candidates = await candidateRepository.findAll(query)
  return candidates
}

const remove = async (id: string) => {
  const candidate = await candidateRepository.findById(id)
  if (!candidate) {
    ApiError.throwNotFound(`candidate with id ${id} not found`)
  }

  await candidateRepository.deleteById(id)
}

export const candidateBusiness = {
  create,
  update,
  findById,
  remove,
  findAll,
}
