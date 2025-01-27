import { RequestHandler } from 'express'
import { UserDto } from '../dtos/user-dto'
import { AuthContext } from '../dtos/auth-context'

export type UpdateUserProfilePictureRequest = RequestHandler<
  { id: string },
  UserDto,
  void,
  void,
  AuthContext
>
