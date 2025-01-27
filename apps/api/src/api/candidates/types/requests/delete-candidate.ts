import { RequestHandler } from 'express'
import { AuthContext } from '../../../users/types/dtos/auth-context'

export type DeleteCandidateRequestHandler = RequestHandler<
  { id: string },
  void,
  void,
  void,
  AuthContext
>
