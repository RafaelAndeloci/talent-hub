import { makeRepository } from '../../shared/services/repository'
import { User } from './types/entities/user'
import { UserModel, UserModelAttributes } from './user-model'

export const userRepository = makeRepository<
  User,
  UserModelAttributes,
  UserModel
>({
  model: UserModel,
  toDatabase: (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    hashedPassword: user.hashedPassword,
    role: user.role,
    profilePictureUrl: user.profilePictureUrl,
    passwordResetToken: user.passwordReset?.token ?? null,
    passwordResetExpiration: user.passwordReset?.expiration ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  }),
  fromDatabase: (model) => ({
    id: model.id,
    username: model.username,
    email: model.email,
    hashedPassword: model.hashedPassword,
    role: model.role,
    profilePictureUrl: model.profilePictureUrl,
    passwordReset: {
      token: model.passwordResetToken!,
      expiration: model.passwordResetExpiration!,
    },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    deletedAt: model.deletedAt,
  }),
})
