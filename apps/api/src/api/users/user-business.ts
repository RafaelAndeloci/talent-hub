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
import { fileStorageService } from '../../shared/services/file-storage-service'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { config } from '../../config/environment'
import moment from 'moment'
import { jobQueueService } from '../../shared/services/job-service'
import { AppEvent } from '../../shared/enums/app-event'

const {
  security: { password: passwordConfig },
} = config

const canCreateCandidate = (user: User) =>
  user.role === Role.sysAdmin || user.role === Role.candidate

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
  const user = await userRepository.findByEmailOrUserName({ email, username })
  if (!user) {
    ApiError.throwNotFound('User not found')
  }

  const hashedPassword = await hasher.hash(password)
  if (hashedPassword !== user!.hashedPassword) {
    ApiError.throwUnauthorized('Invalid credentials')
  }
  return jwtService.generateToken(toDto(user!))
}

const updateProfilePicture = async ({
  userId,
  file,
}: {
  userId: string
  file: {
    content: Buffer
    contentType: string
  }
}) => {
  const user = await userRepository.findById(userId)
  if (!user) {
    ApiError.throwNotFound(`user with id ${userId} not found`)
  }

  const key = `user-${userId}-profile-picture.${file.contentType.split('/')[1]}`
  const url = await fileStorageService.upload({
    key,
    file: file.content,
    contentType: file.contentType,
  })

  user!.profilePictureUrl = url

  await userRepository.update(user!)
  return toDto(user!)
}

const findById = async (id: string) => {
  const user = await userRepository.findById(id)
  if (!user) {
    ApiError.throwNotFound(`user with id ${id} not found`)
  }

  return toDto(user!)
}

const findAll = async (args: FindAllArgs<User>) => {
  const users = await userRepository.findAll(args)
  return users.parse(toDto)
}

const remove = async (id: string) => {
  const user = await userRepository.findById(id)
  if (!user) {
    ApiError.throwNotFound(`user with id ${id} not found`)
  }

  await userRepository.deleteById(id)
}

const sendResetPasswordToken = async ({
  email,
  username,
}: {
  email?: string
  username?: string
}) => {
  const user = await userRepository.findByEmailOrUserName({ email, username })
  if (!user) {
    ApiError.throwNotFound('user not found')
  }

  user!.passwordReset = {
    token: await hasher.genRandomToken(),
    expiration: moment().add(passwordConfig.resetExpiration, 'hours').unix(),
  }

  await userRepository.update(user!)

  await jobQueueService.enqueue({
    event: AppEvent.userPasswordReset,
    payload: { userId: user!.id },
  })
}

const confirmResetPassword = async ({
  userId,
  token,
  password,
}: {
  userId: string
  token: string
  password: string
}) => {
  const user = await userRepository.findById(userId)
  if (!user) {
    ApiError.throwNotFound('user not found')
  }

  if (!user!.passwordReset) {
    ApiError.throwBadRequest('user did not request password reset')
  }

  const isExpired = moment().unix() > user!.passwordReset!.expiration
  if (isExpired) {
    ApiError.throwBadRequest('Token expired')
  }

  if (user!.passwordReset!.token !== token) {
    ApiError.throwBadRequest('Invalid token')
  }

  user!.hashedPassword = await hasher.hash(password)
  user!.passwordReset = null

  await userRepository.update(user!)
}

export const userBusiness = {
  create,
  auth,
  canCreateCandidate,
  updateProfilePicture,
  findById,
  findAll,
  remove,
  sendResetPasswordToken,
  confirmResetPassword,
}
