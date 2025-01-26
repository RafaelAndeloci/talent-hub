import { RequestHandler } from 'express'
import { Candidate } from '../entities/candidate'
import { AuthContext } from '../../../users/types/dtos/auth-context'

export type UpdateCandidateFileRequestHandler = RequestHandler<
  { id: string },
  Candidate,
  Express.Multer.File,
  void,
  AuthContext
>
