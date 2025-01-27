import { RequestHandler } from 'express'

import { AuthContext } from '../dtos/auth-context'

export type ResetUserPasswordRequestHandler = RequestHandler<
  void,
  void,
  { email?: string; username?: string },
  void,
  AuthContext
>
