import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
}

export default authenticate; 

