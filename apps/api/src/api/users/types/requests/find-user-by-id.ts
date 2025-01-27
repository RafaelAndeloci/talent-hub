import { RequestHandler } from 'express'

import { AuthContext } from '../dtos/auth-context'
import { UserDto } from '../dtos/user-dto'

export type FindUserBuIdRequestHandler = RequestHandler<
  { id: string },
  UserDto,
  void,
  void,
  AuthContext
>
