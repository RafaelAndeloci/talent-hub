import { Op } from 'sequelize'
import moment from 'moment'

import { ApiError } from '../../shared/types/api-error'
import { CreateUserDto } from './types/dtos/create-user-dto'
import { userRepository } from './user-repository'
import { hasher } from '../../shared/services/hasher'
import { newInstance, toDto } from './user-parser'
import { jwtService } from '../../shared/services/jwt-service'
import { fileStorageService } from '../../shared/services/file-storage-service'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { User } from './types/entities/user'
import { config } from '../../config/environment'
import { AppEvent } from '../../shared/enums/app-event'
import { jobQueueService } from '../../shared/services/job-service'
import { Role } from './types/enums/role'

export const userBusiness = {
  async create(payload: CreateUserDto) {
    if (
      await userRepository.exists({
        [Op.or]: [{ email: payload.email }, { username: payload.username }],
      })
    ) {
      ApiError.throwConflict('cannot create user')
    }

    const hashedPassword = await hasher.hash(payload.password)
    const emailConfirmationToken = await hasher.genRandomToken()

    const user = newInstance({
      payload,
      hashedPassword,
      emailConfirmationToken,
    })

    await userRepository.create(user)

    await jobQueueService.enqueue({
      event: AppEvent.userCreated,
      payload: { userId: user.id },
    })

    return toDto(user)
  },

  async auth({
    usernameOrEmail,
    password,
  }: {
    usernameOrEmail: string
    password: string
  }) {
    const user = await userRepository.findByEmailOrUserName(usernameOrEmail)
    if (!user) {
      ApiError.throwNotFound('invalid credentials')
    }

    if (user!.emailConfirmationToken && user!.role !== Role.sysAdmin) {
      ApiError.throwUnauthorized('email not confirmed')
    }

    if (!(await hasher.compare(password, user!.hashedPassword))) {
      ApiError.throwUnauthorized('invalid credentials')
    }

    const dto = toDto(user!)
    return jwtService.generateToken(dto)
  },

  async updateProfilePicture({
    userId,
    file,
  }: {
    userId: string
    file: { content: Buffer; contentType: string }
  }) {
    const user = await userRepository.findById(userId)
    if (!user) {
      ApiError.throwNotFound('user not found')
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
  },

  async findById(id: string) {
    const user = await userRepository.findById(id)
    if (!user) {
      ApiError.throwNotFound('user not found')
    }

    return toDto(user!)
  },

  async findAll(args: FindAllArgs<User>) {
    const users = await userRepository.findAll(args)
    return users.parse(toDto)
  },

  async remove(id: string) {
    const user = await userRepository.findById(id)
    if (!user) {
      ApiError.throwNotFound('user not found')
    }

    await userRepository.deleteById(id)
  },

  async sendResetPasswordToken({
    usernameOrEmail,
  }: {
    usernameOrEmail: string
  }) {
    const user = await userRepository.findByEmailOrUserName(usernameOrEmail)
    if (!user) {
      ApiError.throwNotFound('user not found')
    }

    user!.passwordReset = {
      token: await hasher.genRandomToken(),
      expiration: moment()
        .add(config.security.password.resetExpiration, 'hours')
        .unix(),
    }

    await userRepository.update(user!)

    await jobQueueService.enqueue({
      event: AppEvent.userPasswordResetTokenRequested,
      payload: { userId: user!.id },
    })
  },

  async confirmResetPassword({
    userId,
    token,
    password,
  }: {
    userId: string
    token: string
    password: string
  }) {
    const user = await userRepository.findById(userId)
    if (!user) {
      ApiError.throwBadRequest('invalid user id')
    }

    if (!user!.passwordReset) {
      ApiError.throwBadRequest('user did not request password reset')
    }

    const isExpired = moment().unix() > user!.passwordReset!.expiration
    if (isExpired) {
      ApiError.throwBadRequest('token expired')
    }

    if (user!.passwordReset!.token !== token) {
      ApiError.throwBadRequest('invalid token')
    }

    user!.hashedPassword = await hasher.hash(password)
    user!.passwordReset = null

    await userRepository.update(user!)

    await jobQueueService.enqueue({
      event: AppEvent.userPasswordChanged,
      payload: { userId: user!.id },
    })
  },

  async confirmEmail({
    userId,
    confirmationToken,
  }: {
    userId: string
    confirmationToken: string
  }) {
    const user = await userRepository.findById(userId)
    if (!user) {
      ApiError.throwBadRequest('invalid user id')
    }

    if (user!.emailConfirmationToken !== confirmationToken) {
      ApiError.throwBadRequest('invalid token')
    }

    user!.emailConfirmationToken = null

    await userRepository.update(user!)

    await jobQueueService.enqueue({
      event: AppEvent.userEmailConfirmed,
      payload: { userId: user!.id },
    })
  },

  canCreateCandidate(user: User) {
    return user.role === Role.candidate || user.role === Role.sysAdmin
  },
}
