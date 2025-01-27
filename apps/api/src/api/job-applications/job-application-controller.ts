import { RequestHandler } from 'express'
import HTTPStatus from 'http-status'

import { JobApplication } from './types/entities/job-application'
import { AuthContext } from '../users/types/dtos/auth-context'
import { jobApplicationBusiness } from './job-application-business'
import { PagedList } from '../../shared/types/paged-list'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { CreateJobApplicationDto } from './types/dtos/create-job-application-dto'
import { UpdateJobApplicationDto } from './types/dtos/update-job-application-dto'

const findById: RequestHandler<
  { id: string },
  JobApplication,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobApplication = await jobApplicationBusiness.findById(req.params.id)
    res.status(HTTPStatus.OK).json(jobApplication!)
  } catch (e) {
    next(e)
  }
}

const findAll: RequestHandler<
  void,
  PagedList<JobApplication>,
  void,
  FindAllArgs<JobApplication>,
  AuthContext
> = async (req, res, next) => {
  try {
    const result = await jobApplicationBusiness.findAll(req.query)
    res.status(HTTPStatus.OK).json(result)
  } catch (e) {
    next(e)
  }
}

const create: RequestHandler<
  void,
  JobApplication,
  CreateJobApplicationDto,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobApplication = await jobApplicationBusiness.create({
      payload: req.body,
      user: res.locals.user,
    })
    res.status(HTTPStatus.CREATED).json(jobApplication)
  } catch (e) {
    next(e)
  }
}

const update: RequestHandler<
  { id: string },
  JobApplication,
  UpdateJobApplicationDto,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const jobApplication = await jobApplicationBusiness.update({
      id: req.params.id,
      payload: req.body,
    })
    res.status(HTTPStatus.OK).json(jobApplication)
  } catch (e) {
    next(e)
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
    await jobApplicationBusiness.remove(req.params.id)
    res.status(HTTPStatus.NO_CONTENT).send()
  } catch (e) {
    next(e)
  }
}

export const jobApplicationController = {
  findById,
  findAll,
  create,
  update,
  remove,
}
