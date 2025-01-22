import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwt-service';
import ApiError from '../types/api-error';

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  if (!token || type !== 'Bearer') {
    ApiError.throwUnauthorized('missing authorization token');
  }

  const user = jwtService.authenticateToken(token);
  if (!user) {
    ApiError.throwUnauthorized('invalid authorization token');
  }

  res.locals.user = user;
  return next();
};

export default authenticate;
