import { RequestHandler } from 'express'
import { Candidate } from '../entities/candidate'
import { UpdateCandidateDto } from '../dtos/update-candidate-dto'
import { AuthContext } from '../../../users/types/dtos/auth-context'

export type UpdateCandidateRequestHandler = RequestHandler<
  { id: string },
  Candidate,
  UpdateCandidateDto,
  void,
  AuthContext
>
