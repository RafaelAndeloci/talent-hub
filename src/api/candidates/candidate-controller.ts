import HTTPStatus from 'http-status'

import { CreateCandidateRequestHandler } from './types/requests/create-candidate'
import { candidateBusiness } from './candidate-business'
import { FindCandidateByIdRequestHandler } from './types/requests/find-by-id'
import { UpdateCandidateRequestHandler } from './types/requests/update-candidate'
import { DeleteCandidateRequestHandler } from './types/requests/delete-candidate'
import { FindAllCandidatesRequestHandler } from './types/requests/find-all-candidates'

const create: CreateCandidateRequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateBusiness.create({
      userId: res.locals.user.id,
      payload: {
        ...req.body,
      },
    })

    res.status(HTTPStatus.CREATED).json(candidate)
  } catch (error) {
    next(error)
  }
}

const update: UpdateCandidateRequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateBusiness.update({
      candidateId: req.params.id,
      payload: req.body,
    })

    res.status(HTTPStatus.OK).json(candidate)
  } catch (error) {
    next(error)
  }
}

const findById: FindCandidateByIdRequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateBusiness.findById(req.params.id)

    res.status(HTTPStatus.OK).json(candidate)
  } catch (error) {
    next(error)
  }
}

const findAll: FindAllCandidatesRequestHandler = async (req, res, next) => {
  try {
    const candidates = await candidateBusiness.findAll(req.query)

    res.status(HTTPStatus.OK).json(candidates)
  } catch (error) {
    next(error)
  }
}

const remove: DeleteCandidateRequestHandler = async (req, res, next) => {
  try {
    await candidateBusiness.remove(req.params.id)
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

export const candidateController = {
  create,
  update,
  findById,
  findAll,
  remove,
}
