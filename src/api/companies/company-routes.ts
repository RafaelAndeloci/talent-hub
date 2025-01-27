/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'
import {
  CreateCompanySchema,
  DeleteCompanySchema,
  FindAllCompaniesSchema,
  FindCompanyByIdSchema,
  UpdateCompanySchema,
} from './company-schema'
import { validate } from '../../middlewares/validation-middleware'
import { companyController } from './company-controller'

export const companyRouter = Router()

companyRouter.get(
  '',
  authorize({ resource: Resource.companies, action: Action.readAll }),
  validate(FindAllCompaniesSchema),
  companyController.findAll as any,
)

companyRouter.get(
  '/:id',
  authorize({ resource: Resource.companies, action: Action.readById }),
  validate(FindCompanyByIdSchema),
  companyController.findById as any,
)

companyRouter.post(
  '',
  authorize({ resource: Resource.companies, action: Action.create }),
  validate(CreateCompanySchema),
  companyController.create as any,
)

companyRouter.put(
  '/:id',
  authorize({ resource: Resource.companies, action: Action.update }),
  validate(UpdateCompanySchema),
  companyController.update as any,
)

companyRouter.delete(
  '/:id',
  authorize({ resource: Resource.companies, action: Action.delete }),
  validate(DeleteCompanySchema),
  companyController.remove as any,
)
