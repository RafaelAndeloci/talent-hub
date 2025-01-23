/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../shared/types/api-error'
import { jwtService } from '../shared/services/jwt-service'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const [type, token] = req.headers.authorization?.split(' ') ?? []
  if (!token || type !== 'Bearer') {
    ApiError.throwUnauthorized('missing authorization token')
  }

  const user = jwtService.authenticateToken(token)
  if (!user) {
    ApiError.throwUnauthorized('invalid authorization token')
  }

  res.locals.user = user
  return next()
}
