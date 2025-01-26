import { Router } from 'express'

import {
  CreateCandidateSchema,
  DeleteCandidateSchema,
  FindAllCandidatesSchema,
  FindCandidateByIdSchema,
  UpdateCandidateSchema,
} from './candidate-schema'
import { validate } from '../../middlewares/validation-middleware'
import { candidateController } from './candidate-controller'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'

export const candidatesRouter = Router()

candidatesRouter.post(
  '/',
  authorize({ resource: Resource.candidates, action: Action.create }),
  validate(CreateCandidateSchema),
  candidateController.create,
)

candidatesRouter.put(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.update }),
  validate(UpdateCandidateSchema),
  candidateController.update,
)

candidatesRouter.delete(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.delete }),
  validate(DeleteCandidateSchema),
  candidateController.remove,
)

candidatesRouter.get(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.readById }),
  validate(FindCandidateByIdSchema),
  candidateController.findById,
)

candidatesRouter.get(
  '/',
  authorize({ resource: Resource.candidates, action: Action.readAll }),
  validate(FindAllCandidatesSchema),
  candidateController.findAll,
)
