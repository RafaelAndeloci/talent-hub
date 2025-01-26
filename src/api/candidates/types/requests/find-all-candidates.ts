import { RequestHandler } from 'express'
import { PagedList } from '../../../../shared/types/paged-list'
import { FindAllArgs } from '../../../../shared/types/find-all-args'
import { AuthContext } from '../../../users/types/dtos/auth-context'
import { Candidate } from '../entities/candidate'

export type FindAllCandidatesRequestHandler = RequestHandler<
  void,
  PagedList<Candidate>,
  void,
  FindAllArgs,
  AuthContext
>
