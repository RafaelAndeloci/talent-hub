import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwt-service';

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  if (!token || type !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = jwtService.authenticateToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.locals.user = user;
  return next();
};

export default authenticate;
