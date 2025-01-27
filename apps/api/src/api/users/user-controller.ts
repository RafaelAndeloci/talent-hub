import HTTPStatus from 'http-status'

import { CreateUserRequestHandler } from './types/requests/create-request-handler'
import { userBusiness } from './user-business'
import { AuthRequestHandler } from './types/requests/auth-request-handler'
import { ApiError } from '../../shared/types/api-error'
import { UpdateUserProfilePictureRequest } from './types/requests/update-user-profile-picture'
import { FindAllUsersRequestHandler } from './types/requests/find-all-users'
import { FindUserBuIdRequestHandler as FindUserByIdRequestHandler } from './types/requests/find-user-by-id'
import { ResetUserPasswordRequestHandler } from './types/requests/reset-user-password'
import { RemoveUserRequestHandler } from './types/requests/remove'
import { ConfirmResetPasswordRequestHandler } from './types/requests/user-confirm-password-reset'

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

const sendResetPasswordToken: ResetUserPasswordRequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    await userBusiness.sendResetPasswordToken({
      email: req.body.email,
      username: req.body.username,
    })
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const confirmResetPassword: ConfirmResetPasswordRequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { userId, token, password } = req.body
    await userBusiness.confirmResetPassword({ userId, token, password })
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const updateProfilePicture: UpdateUserProfilePictureRequest = async (
  req,
  res,
  next,
) => {
  try {
    const {
      params: { id: userId },
      file: { buffer, mimetype } = {},
    } = req

    if (!buffer || !mimetype) {
      ApiError.throwBadRequest('file and mimetype are required')
    }

    const user = await userBusiness.updateProfilePicture({
      userId,
      file: {
        content: buffer!,
        contentType: mimetype!,
      },
    })

    res.status(HTTPStatus.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const findById: FindUserByIdRequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userBusiness.findById(id)
    res.status(HTTPStatus.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const findAll: FindAllUsersRequestHandler = async (req, res, next) => {
  try {
    const users = await userBusiness.findAll(req.query)
    res.status(HTTPStatus.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const remove: RemoveUserRequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    await userBusiness.remove(id)
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  create,
  auth,
  sendResetPasswordToken,
  updateProfilePicture,
  findById,
  findAll,
  remove,
  confirmResetPassword,
}
