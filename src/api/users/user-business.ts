import { Op } from 'sequelize'

import { User } from './types/entities/user'
import { Role } from './types/enums/role'
import { CreateUserDto } from './types/dtos/create-user-dto'
import { userRepository } from './user-repository'
import { ApiError } from '../../shared/types/api-error'
import { hasher } from '../../shared/services/hasher'
import { AuthArgsDto } from './types/dtos/./auth-args-dto'
import { jwtService } from '../../shared/services/jwt-service'
import { newInstance, toDto } from './user-parser'

const canCreateCandidate = (user: User) =>
  user.role === Role.SysAdmin || user.role === Role.Candidate

const create = async (payload: CreateUserDto) => {
  if (
    await userRepository.exists({
      [Op.or]: [{ email: payload.email }, { username: payload.username }],
    })
  ) {
    ApiError.throwConflict('User already exists')
  }

  const hashedPassword = await hasher.hash(payload.password)
  const user: User = newInstance({ payload, hashedPassword })

  await userRepository.create(user)
  return toDto(user)
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
  return jwtService.generateToken(toDto(user!))
}

export const userBusiness = {
  create,
  auth,
  canCreateCandidate,
}
