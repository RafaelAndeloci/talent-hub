import HTTPStatus from 'http-status'

import { candidateBusiness } from './candidate-business'
import { ApiError } from '../../shared/types/api-error'
import { RequestHandler } from 'express'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { PagedList } from '../../shared/types/paged-list'
import { AuthContext } from '../users/types/dtos/auth-context'
import { Candidate } from './types/entities/candidate'

const create: RequestHandler<
  void,
  Candidate,
  Candidate,
  void,
  AuthContext
> = async (req, res, next) => {
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

const update: RequestHandler<
  { id: string },
  Candidate,
  Candidate,
  void,
  AuthContext
> = async (req, res, next) => {
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

const findById: RequestHandler<
  { id: string },
  Candidate,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const candidate = await candidateBusiness.findById(req.params.id)

    res.status(HTTPStatus.OK).json(candidate)
  } catch (error) {
    next(error)
  }
}

const findAll: RequestHandler<
  void,
  PagedList<Candidate>,
  void,
  FindAllArgs<Candidate>,
  AuthContext
> = async (req, res, next) => {
  try {
    const candidates = await candidateBusiness.findAll(req.query)

    res.status(HTTPStatus.OK).json(candidates)
  } catch (error) {
    next(error)
  }
}

const remove: RequestHandler<
  { id: string },
  void,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    await candidateBusiness.remove(req.params.id)
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const updateCv: RequestHandler<
  { id: string },
  Candidate,
  Express.Multer.File,
  void,
  AuthContext
> = async (req, res, next) => {
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

const updateBanner: RequestHandler<
  { id: string },
  Candidate,
  Express.Multer.File,
  void,
  AuthContext
> = async (req, res, next) => {
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
