import { Router } from 'express'
import { CreateCandidateSchema } from './candidate-schema'
import { validate } from '../../middlewares/validation-middleware'
import { candidateController } from './candidate-controller'

export const candidatesRouter = Router()

candidatesRouter.post(
  '/',
  validate(CreateCandidateSchema),
  candidateController.create,
)
