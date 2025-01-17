import { Candidate } from '@prisma/client';
import { Request, Response } from 'express';
import CandidateDtoProps from './candidate-dto-props';
import FindAllProps from '../../../types/find-all-props';
import CreateCandidateProps from './create-candidate-props';

type CandidateController = {
  findById: (
    req: Request<Pick<Candidate, 'id'>, void, void, void>,
    res: Response<CandidateDtoProps>,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindAllProps<CandidateDtoProps>>,
    res: Response,
  ) => Promise<void>;

  create: (
    req: Request<void, void, CreateCandidateProps>,
    res: Response<CandidateDtoProps>,
  ) => Promise<void>;

  update: (
    req: Request<Pick<Candidate, 'id'>, void, Partial<CandidateDtoProps>>,
    res: Response<void>,
  ) => Promise<void>;

  remove: (
    req: Request<Pick<Candidate, 'id'>>,
    res: Response<void>,
  ) => Promise<void>;
};

export default CandidateController;
