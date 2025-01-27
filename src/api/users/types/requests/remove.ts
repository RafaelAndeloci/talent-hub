import { RequestHandler } from 'express'

import { AuthContext } from '../dtos/auth-context'

export type RemoveUserRequestHandler = RequestHandler<
  { id: string },
  void,
  void,
  void,
  AuthContext
>
