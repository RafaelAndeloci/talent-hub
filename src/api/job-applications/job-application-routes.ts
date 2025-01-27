import { Router } from 'express'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'
import { validate } from '../../middlewares/validation-middleware'
import {
  CreateJobApplicationSchema,
  DeleteJobApplicationSchema,
  FindAllJobApplicationsSchema,
  FindJobApplicationByIdSchema,
  UpdateJobApplicationSchema,
} from './job-application-schema'
import { jobApplicationController } from './job-application-controller'

export const jobApplicationRouter = Router()

jobApplicationRouter.get(
  '/',
  authorize({
    resource: Resource.jobApplications,
    action: Action.readAll,
  }),
  validate(FindAllJobApplicationsSchema),
  jobApplicationController.findAll,
)

jobApplicationRouter.get(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.readById,
  }),
  validate(FindJobApplicationByIdSchema),
  jobApplicationController.findById,
)

jobApplicationRouter.post(
  '/',
  authorize({
    resource: Resource.jobApplications,
    action: Action.create,
  }),
  validate(CreateJobApplicationSchema),
  jobApplicationController.create,
)

jobApplicationRouter.put(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.update,
  }),
  validate(UpdateJobApplicationSchema),
  jobApplicationController.update,
)

jobApplicationRouter.delete(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.delete,
  }),
  validate(DeleteJobApplicationSchema),
  jobApplicationController.remove,
)
