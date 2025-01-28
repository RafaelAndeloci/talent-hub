/* eslint-disable @typescript-eslint/no-unused-vars */
import * as uuid from 'uuid'

import { CreateUserDto } from './types/dtos/create-user-dto'
import { User } from './types/entities/user'
import { UserModelAttr } from './user-model'
import { UserDto } from './types/dtos/user-dto'
import _ from 'lodash'

export const fromDatabase = (model: UserModelAttr): User => ({
  id: model.id,
  username: model.username,
  email: model.email,
  hashedPassword: model.hashedPassword,
  passwordReset:
    model.passwordResetExpiration && model.passwordResetToken
      ? {
          expiration: model.passwordResetExpiration,
          token: model.passwordResetToken,
        }
      : null,
  emailConfirmationToken: model.emailConfirmationToken,
  profilePictureUrl: model.profilePictureUrl,
  role: model.role,
})

export const toDatabase = (user: User): UserModelAttr => ({
  id: user.id,
  username: user.username,
  email: user.email,
  hashedPassword: user.hashedPassword,
  role: user.role,
  profilePictureUrl: user.profilePictureUrl,
  passwordResetExpiration: user.passwordReset?.expiration || null,
  passwordResetToken: user.passwordReset?.token || null,
  emailConfirmationToken: user.emailConfirmationToken,
})

export const newInstance = ({
  payload,
  hashedPassword,
  emailConfirmationToken,
}: {
  payload: CreateUserDto
  hashedPassword: string
  emailConfirmationToken: string
}): User => ({
  id: uuid.v4(),
  username: payload.username,
  email: payload.email,
  hashedPassword,
  passwordReset: null,
  profilePictureUrl: null,
  role: payload.role,
  emailConfirmationToken,
})

export const toDto = (user: User): UserDto =>
  _.omit(user, [
    'hashedPassword',
    'emailConfirmationToken',
    'passwordReset',
  ]) as UserDto
