import HTTPStatus from 'http-status'

import { userBusiness } from './user-business'
import { ApiError } from '../../shared/types/api-error'
import { RequestHandler } from 'express'
import { AuthDto } from './types/dtos/auth-dto'
import { AuthContext } from './types/dtos/auth-context'
import { UserDto } from './types/dtos/user-dto'
import { PagedList } from '../../shared/types/paged-list'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { User } from './types/entities/user'
import { CreateUserDto } from './types/dtos/create-user-dto'

const create: RequestHandler<void, UserDto, CreateUserDto, void> = async (
  req,
  res,
  next,
) => {
  try {
    const user = await userBusiness.create(req.body)
    res.status(HTTPStatus.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const auth: RequestHandler<
  void,
  AuthDto,
  {
    usernameOrEmail: string
    password: string
  },
  void
> = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body
    const user = await userBusiness.auth({ usernameOrEmail, password })
    res.status(HTTPStatus.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const sendResetPasswordToken: RequestHandler<
  void,
  void,
  { usernameOrEmail: string },
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    await userBusiness.sendResetPasswordToken({
      usernameOrEmail: req.body.usernameOrEmail,
    })
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const confirmResetPassword: RequestHandler<
  void,
  void,
  { userId: string; token: string; password: string }
> = async (req, res, next) => {
  try {
    const { userId, token, password } = req.body
    await userBusiness.confirmResetPassword({ userId, token, password })
    res.sendStatus(HTTPStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const updateProfilePicture: RequestHandler<
  { id: string },
  UserDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
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

const findById: RequestHandler<
  { id: string },
  UserDto,
  void,
  void,
  AuthContext
> = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userBusiness.findById(id)
    res.status(HTTPStatus.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const findAll: RequestHandler<
  void,
  PagedList<UserDto>,
  void,
  FindAllArgs<User>,
  AuthContext
> = async (req, res, next) => {
  try {
    const users = await userBusiness.findAll(req.query)
    res.status(HTTPStatus.OK).json(users)
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
