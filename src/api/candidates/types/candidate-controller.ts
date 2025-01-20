import { Request, Response } from 'express';
import FindAllProps from '../../../types/find-all-props';
import { Candidate } from './candidate';

type CandidateController = {
  findById: (
    req: Request<Pick<Candidate, 'id'>, void, void, void>,
    res: Response<Candidate>,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindAllProps<Candidate>>,
    res: Response,
  ) => Promise<void>;

  create: (
    req: Request<void, void, Omit<Candidate, 'id'>>,
    res: Response<Candidate>,
  ) => Promise<void>;

  update: (
    req: Request<Pick<Candidate, 'id'>, void, Partial<Candidate>>,
    res: Response<Candidate>,
  ) => Promise<void>;

  remove: (
    req: Request<Pick<Candidate, 'id'>>,
    res: Response<void>,
  ) => Promise<void>;
};

export default CandidateController;
