import { Op } from 'sequelize'

import { makeRepository } from '../../shared/services/repository'
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
  findByEmailOrUserName(usernameOrEmail: string) {
    return makedRepository.findUnique({
      [Op.or]: {
        email: usernameOrEmail,
        username: usernameOrEmail,
      },
    })
  },
}
