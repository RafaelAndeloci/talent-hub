import { RequestHandler } from 'express'
import HTTPStatus from 'http-status'

import { JobOpeningDto } from './types/dtos/job-opening-dto'
import { AuthContext } from '../users/types/dtos/auth-context'
import { jobOpeningBusiness } from './job-opening-business'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { JobOpening } from './types/entities/job-opening'
import { PagedList } from '../../shared/types/paged-list'

const findById: RequestHandler<
  { id: string },
  JobOpeningDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const role = res.locals.user.role!

    const jobOpening = await jobOpeningBusiness.findById(req.params.id, role)
    res.status(HTTPStatus.OK).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

const findAll: RequestHandler<
  void,
  PagedList<JobOpeningDto>,
  void,
  FindAllArgs<JobOpening>,
  AuthContext
> = async (req, res, next) => {
  try {
    const user = res.locals.user

    const jobOpenings = await jobOpeningBusiness.findAll(req.query, user)
    res.status(HTTPStatus.OK).json(jobOpenings)
  } catch (error) {
    next(error)
  }
}

const create: RequestHandler<
  void,
  JobOpeningDto,
  Omit<JobOpening, 'id' | 'hiredCandidateId'>,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.create(req.body)
    res.status(HTTPStatus.CREATED).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

const update: RequestHandler<
  { id: string },
  JobOpeningDto,
  Partial<Omit<JobOpening, 'id' | 'hiredCandidateId' | 'status'>>,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.update(req.params.id, req.body)
    res.status(HTTPStatus.OK).json(jobOpening)
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
    await jobOpeningBusiness.remove(req.params.id)
    res.status(HTTPStatus.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const open: RequestHandler<
  { id: string },
  JobOpeningDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.open(req.params.id)
    res.status(HTTPStatus.OK).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

const close: RequestHandler<
  { id: string },
  JobOpeningDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.close(req.params.id)
    res.status(HTTPStatus.OK).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

const toDraft: RequestHandler<
  { id: string },
  JobOpeningDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.toDraft(req.params.id)
    res.status(HTTPStatus.OK).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

const fill: RequestHandler<
  { id: string },
  JobOpeningDto,
  { selectedApplicationId: string },
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobOpening = await jobOpeningBusiness.fill({
      id: req.params.id,
      selectedApplicationId: req.body.selectedApplicationId,
      user: res.locals.user,
    })
    res.status(HTTPStatus.OK).json(jobOpening)
  } catch (error) {
    next(error)
  }
}

export const jobOpeningController = {
  findById,
  findAll,
  create,
  update,
  remove,
  open,
  close,
  toDraft,
  fill,
}
