import { RequestHandler } from 'express'

import { FindAllArgs } from '../../../../shared/types/find-all-args'
import { PagedList } from '../../../../shared/types/paged-list'
import { AuthContext } from '../dtos/auth-context'
import { UserDto } from '../dtos/user-dto'
import { User } from '../entities/user'

export type FindAllUsersRequestHandler = RequestHandler<
  void,
  PagedList<UserDto>,
  void,
  FindAllArgs<User>,
  AuthContext
>
