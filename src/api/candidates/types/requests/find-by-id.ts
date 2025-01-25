import { RequestHandler } from 'express'
import { CandidateDto } from '../dtos/candidate-dto'
import { AuthContext } from '../../../users/types/dtos/auth-context'

export type FindCandidateByIdRequestHandler = RequestHandler<
  { id: string },
  CandidateDto,
  void,
  void,
  AuthContext
>
