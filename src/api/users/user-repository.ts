import { makeRepository } from '../../shared/services/repository'
import { User } from './types/entities/user'
import { UserModel, UserModelAttr } from './user-model'
import { fromDatabase, toDatabase } from './user-parser'

export const userRepository = makeRepository<User, UserModelAttr, UserModel>({
  model: UserModel,
  toDatabase,
  fromDatabase,
})
