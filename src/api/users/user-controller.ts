import HTTPStatus from 'http-status'

import { CreateUserRequestHandler } from './types/requests/create-request-handler'
import { userBusiness } from './user-business'
import { AuthRequestHandler } from './types/requests/auth-request-handler'

const create: CreateUserRequestHandler = async (req, res, next) => {
  try {
    const user = await userBusiness.create(req.body)
    res.status(HTTPStatus.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const auth: AuthRequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = await userBusiness.auth({ username, email, password })
    res.status(HTTPStatus.OK).json(user)
  } catch (error) {
    next(error)
  }
}

export const userController = Object.freeze({
  create,
  auth,
})
