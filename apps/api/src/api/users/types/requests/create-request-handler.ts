import { RequestHandler } from 'express'
import { UserDto } from '../dtos/user-dto'
import { CreateUserDto } from '../dtos/create-user-dto'

export type CreateUserRequestHandler = RequestHandler<
  void,
  UserDto,
  CreateUserDto,
  void
>
