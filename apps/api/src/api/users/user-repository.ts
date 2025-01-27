import { Op } from 'sequelize'
import { makeRepository } from '../../shared/services/repository'
import { ApiError } from '../../shared/types/api-error'
import { User } from './types/entities/user'
import { UserModel, UserModelAttr } from './user-model'
import { fromDatabase, toDatabase } from './user-parser'

const makedRepository = makeRepository<User, UserModelAttr, UserModel>({
  model: UserModel,
  toDatabase,
  fromDatabase,
})

export const userRepository = {
  ...makedRepository,
  findByEmailOrUserName({
    email,
    username,
  }: {
    email?: string
    username?: string
  }) {
    if (!email && !username) {
      ApiError.throwBadRequest(`email or username is required`)
    }

    return makedRepository.findUnique({
      [Op.or]: [
        ...(email ? [{ email }] : []),
        ...(username ? [{ username }] : []),
      ],
    })
  },
}
