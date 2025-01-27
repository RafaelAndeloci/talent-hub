import { RequestHandler } from 'express'
import { AuthContext } from '../../../users/types/dtos/auth-context'
import { Candidate } from '../entities/candidate'

export type CreateCandidateRequestHandler = RequestHandler<
  void,
  Candidate,
  Candidate,
  void,
  AuthContext
>
