import { Router } from 'express'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'
import {
  CreateJobOpeningSchema,
  FillJobOpeningSchema,
  FindJobOpeningByIdSchema,
  FindJobOpeningsSchema,
  UpdateJobOpeningSchema,
  UpdateJobOpeningStatusSchema,
} from './job-opening-schema'
import { validate } from '../../middlewares/validation-middleware'
import { jobOpeningController } from './job-opening-controller'

export const jobOpeningRouter = Router()

jobOpeningRouter.get(
  '/',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.readAll,
  }),
  validate(FindJobOpeningsSchema),
  jobOpeningController.findAll,
)

jobOpeningRouter.get(
  '/:id',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.readById,
  }),
  validate(FindJobOpeningByIdSchema),
  jobOpeningController.findById,
)

jobOpeningRouter.post(
  '/',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.create,
  }),
  validate(CreateJobOpeningSchema),
  jobOpeningController.create,
)

jobOpeningRouter.put(
  '/:id',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.update,
  }),
  validate(UpdateJobOpeningSchema),
  jobOpeningController.update,
)

jobOpeningRouter.patch(
  '/:id/open',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.update,
  }),
  validate(UpdateJobOpeningStatusSchema),
  jobOpeningController.open,
)

jobOpeningRouter.patch(
  '/:id/close',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.update,
  }),
  validate(UpdateJobOpeningStatusSchema),
  jobOpeningController.close,
)

jobOpeningRouter.patch(
  '/:id/draft',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.update,
  }),
  validate(UpdateJobOpeningStatusSchema),
  jobOpeningController.toDraft,
)

jobOpeningRouter.patch(
  '/:id/fill',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.update,
  }),
  validate(FillJobOpeningSchema),
  jobOpeningController.fill,
)

jobOpeningRouter.delete(
  '/:id',
  authorize({
    resource: Resource.jobOpenings,
    action: Action.delete,
  }),
  validate(FindJobOpeningByIdSchema),
  jobOpeningController.remove,
)
