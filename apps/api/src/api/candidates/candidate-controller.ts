import HTTPStatus from 'http-status'

import { CreateCandidateRequestHandler } from './types/requests/create-candidate'
import { candidateBusiness } from './candidate-business'
import { FindCandidateByIdRequestHandler } from './types/requests/find-by-id'
import { UpdateCandidateRequestHandler } from './types/requests/update-candidate'
import { DeleteCandidateRequestHandler } from './types/requests/delete-candidate'
import { FindAllCandidatesRequestHandler } from './types/requests/find-all-candidates'
import { UpdateCandidateFileRequestHandler } from './types/requests/update-candidate-file'
import { ApiError } from '../../shared/types/api-error'

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

const updateCv: UpdateCandidateFileRequestHandler = async (req, res, next) => {
  try {
    const {
      params: { id: candidateId },
      file: { mimetype, buffer } = {},
    } = req
    if (!mimetype || !buffer) {
      ApiError.throwBadRequest('file is required')
    }

    const candidate = await candidateBusiness.updateCv({
      candidateId,
      file: {
        content: buffer!,
        contentType: mimetype!,
      },
    })

    res.status(HTTPStatus.OK).json(candidate!)
  } catch (error) {
    next(error)
  }
}

const updateBanner: UpdateCandidateFileRequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const {
      params: { id: candidateId },
      file: { mimetype, buffer } = {},
    } = req
    if (!mimetype || !buffer) {
      ApiError.throwBadRequest('file is required')
    }

    const candidate = await candidateBusiness.updateBanner({
      candidateId,
      file: {
        content: buffer!,
        contentType: mimetype!,
      },
    })

    res.status(HTTPStatus.OK).json(candidate!)
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
  updateCv,
  updateBanner,
}
