import { Router } from 'express'

import {
  CreateCandidateSchema,
  FindCandidateByIdSchema,
  UpdateCandidateSchema,
} from './candidate-schema'
import { validate } from '../../middlewares/validation-middleware'
import { candidateController } from './candidate-controller'

export const candidatesRouter = Router()

candidatesRouter.post(
  '/',
  validate(CreateCandidateSchema),
  candidateController.create,
)

candidatesRouter.put(
  '/:id',
  validate(UpdateCandidateSchema),
  candidateController.update,
)

candidatesRouter.get(
  '/:id',
  validate(FindCandidateByIdSchema),
  candidateController.findById,
)
