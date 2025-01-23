import { Op } from 'sequelize'
import * as uuid from 'uuid'
import _ from 'lodash'

import { User } from './types/entities/user'
import { Role } from './types/enums/role'
import { CreateUserDto } from './types/dtos/create-user-dto'
import { userRepository } from './user-repository'
import { ApiError } from '../../shared/types/api-error'
import { hasher } from '../../shared/services/hasher'
import { UserDto } from './types/dtos/user-dto'
import { AuthArgsDto } from './types/dtos/./auth-args-dto'
import { jwtService } from '../../shared/services/jwt-service'

const toDto = (user: User): UserDto => {
  return _.omit(user, [
    'hashedPassword',
    'passwordReset',
    'deletedAt',
    'updatedAt',
    'createdAt',
  ]) as UserDto
}

const isActive = (user: User) => user.deletedAt === null

const canCreateCandidate = (user: User) =>
  user.role === Role.SysAdmin || user.role === Role.Candidate

const create = async (user: CreateUserDto) => {
  if (
    await userRepository.exists({
      [Op.or]: [{ email: user.email }, { username: user.username }],
    })
  ) {
    ApiError.throwConflict('User already exists')
  }

  const hashedPassword = await hasher.hash(user.password)

  const newUser: User = {
    ...user,
    id: uuid.v4(),
    profilePictureUrl: null,
    hashedPassword,
    passwordReset: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  await userRepository.create(newUser)
  return toDto(newUser)
}

const auth = async ({ username, email, password }: AuthArgsDto) => {
  const user = await userRepository.findUnique({
    [Op.or]: [
      ...(username ? [{ username }] : []),
      ...(email ? [{ email }] : []),
    ],
  })
  if (!user) {
    ApiError.throwNotFound('User not found')
  }

  const hashedPassword = await hasher.hash(password)
  if (hashedPassword !== user!.hashedPassword) {
    ApiError.throwUnauthorized('Invalid credentials')
  }
  const dto = toDto(user!)
  return jwtService.generateToken(dto)
}

export const userBusiness = Object.freeze({
  create,
  auth,
  isActive,
  canCreateCandidate,
})
