import { RequestHandler } from 'express'

export type ConfirmResetPasswordRequestHandler = RequestHandler<
  void,
  void,
  { userId: string; token: string; password: string }
>
