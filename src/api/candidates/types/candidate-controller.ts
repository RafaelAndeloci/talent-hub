import { NextFunction, Request, Response } from 'express';
import FindAllProps from '../../../types/find-all-props';
import { Candidate } from './candidate';

type CandidateController = {
  findById: (
    req: Request<Pick<Candidate, 'id'>, void, void, void>,
    res: Response<Candidate>,
    next: NextFunction,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindAllProps<Candidate>>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  create: (
    req: Request<void, void, Omit<Candidate, 'id'>>,
    res: Response<Candidate>,
    next: NextFunction,
  ) => Promise<void>;

  update: (
    req: Request<Pick<Candidate, 'id'>, void, Partial<Candidate>>,
    res: Response<Candidate>,
    next: NextFunction,
  ) => Promise<void>;

  updateCv: (
    req: Request<Pick<Candidate, 'id'>, void, Express.Multer.File>,
    res: Response<Candidate>,
    next: NextFunction,
  ) => Promise<void>;

  remove: (
    req: Request<Pick<Candidate, 'id'>>,
    res: Response<void>,
    next: NextFunction,
  ) => Promise<void>;
};

export default CandidateController;
