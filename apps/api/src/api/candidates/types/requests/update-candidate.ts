import { RequestHandler } from 'express'
import { Candidate } from '../entities/candidate'
import { AuthContext } from '../../../users/types/dtos/auth-context'

export type UpdateCandidateRequestHandler = RequestHandler<
  { id: string },
  Candidate,
  Candidate,
  void,
  AuthContext
>
