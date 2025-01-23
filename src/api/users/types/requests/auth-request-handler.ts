import { RequestHandler } from 'express'
import { AuthDto } from '../dtos/auth-dto'
import { AuthArgsDto } from '../dtos/auth-args-dto'

export type AuthRequestHandler = RequestHandler<
  void,
  AuthDto,
  AuthArgsDto,
  void
>
