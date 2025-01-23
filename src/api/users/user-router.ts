import { Router } from 'express'
import { validate } from '../../middlewares/validation-middleware'
import { userController } from './user-controller'
import { AuthSchema, CreateUserSchema } from './user-schema'

export const userRouter = Router()

userRouter.post('/', validate(CreateUserSchema), userController.create)

userRouter.post('/auth', validate(AuthSchema), userController.auth)
