import { RequestHandler } from 'express'

import { AuthContext } from '../../../users/types/dtos/auth-context'
import { Candidate } from '../entities/candidate'

export type FindCandidateByIdRequestHandler = RequestHandler<
  { id: string },
  Candidate,
  void,
  void,
  AuthContext
>
