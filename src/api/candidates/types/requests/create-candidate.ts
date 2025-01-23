import { RequestHandler } from 'express'
import { AuthContext } from '../../../users/types/dtos/auth-context'
import { CandidateDto } from '../dtos/candidate-dto'
import { CreateCandidateDto } from '../dtos/create-candidate-dto'

export type CreateCandidateResponse = CandidateDto

export type CreateCandidateRequestHandler = RequestHandler<
  void,
  CreateCandidateResponse,
  CreateCandidateDto,
  void,
  AuthContext
>
