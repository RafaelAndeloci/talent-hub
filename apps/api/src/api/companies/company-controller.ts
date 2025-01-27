import { RequestHandler } from 'express'
import HTTPStatus from 'http-status'

import { AuthContext } from '../users/types/dtos/auth-context'
import { CompanyDto } from './types/dtos/company-dto'
import { companyBusiness } from './company-business'
import { PagedList } from '../../shared/types/paged-list'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { Company } from './types/entities/company'

const findById: RequestHandler<
  { id: string },
  CompanyDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const role = res.locals.user.role!

    const company = await companyBusiness.findById(req.params.id, role)
    res.status(HTTPStatus.OK).json(company)
  } catch (error) {
    next(error)
  }
}

const findAll: RequestHandler<
  void,
  PagedList<CompanyDto>,
  void,
  FindAllArgs<Company>,
  AuthContext
> = async (req, res, next) => {
  try {
    const role = res.locals.user.role!

    const companies = await companyBusiness.findAll(req.query, role)
    res.status(HTTPStatus.OK).json(companies)
  } catch (error) {
    next(error)
  }
}

const create: RequestHandler<
  void,
  CompanyDto,
  Omit<Company, 'id'>,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const company = await companyBusiness.create(req.body)
    res.status(HTTPStatus.CREATED).json(company)
  } catch (error) {
    next(error)
  }
}

const update: RequestHandler<
  { id: string },
  CompanyDto,
  Partial<Omit<Company, 'id'>>,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const company = await companyBusiness.update(req.params.id, req.body)
    res.status(HTTPStatus.OK).json(company)
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
    await companyBusiness.remove(req.params.id)
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

export const companyController = {
  findById,
  findAll,
  create,
  update,
  remove,
}
