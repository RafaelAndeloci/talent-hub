import HTTPStatus from 'http-status'

import { CreateCandidateRequestHandler } from './types/requests/create-candidate'
import { candidateBusiness } from './candidate-business'
import { FindCandidateByIdRequestHandler } from './types/requests/find-by-id'
import { UpdateCandidateRequestHandler } from './types/requests/update-candidate'

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

export const candidateController = {
  create,
  update,
  findById,
}
