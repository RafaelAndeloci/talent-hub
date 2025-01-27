/* eslint-disable @typescript-eslint/no-unused-vars */
import * as uuid from 'uuid'

import { CreateUserDto } from './types/dtos/create-user-dto'
import { User } from './types/entities/user'
import { UserModelAttr } from './user-model'
import { UserDto } from './types/dtos/user-dto'

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
})

export const newInstance = ({
  payload,
  hashedPassword,
}: {
  payload: CreateUserDto
  hashedPassword: string
}): User => ({
  id: uuid.v4(),
  username: payload.username,
  email: payload.email,
  hashedPassword,
  passwordReset: null,
  profilePictureUrl: null,
  role: payload.role,
})

export const toDto = ({
  hashedPassword,
  passwordReset,
  ...rest
}: User): UserDto => rest
