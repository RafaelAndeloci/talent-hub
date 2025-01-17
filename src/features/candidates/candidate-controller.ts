import { Request, Response } from 'express';
import CandidateProps from './types/candidate-props';
import candidateRepository from './candidate-repository';
import * as uuid from 'uuid';

const candidateController = {
  getById: async ({ params: { id } }: Request, res: Response) => {
    const candidate = await candidateRepository.findById(id);

    res.status(200).json(candidate);
  },
  getAll: async ({ query }: Request, res: Response) => {
    const candidates = await candidateRepository.findAll({ ...query });

    res.status(200).json(candidates);
  },
  create: async ({ body }: Request, res: Response) => {
    const candidate = {
      ...body,
      id: uuid.v4(),
    };

    await candidateRepository.create(candidate);

    res.status(201).json(candidate);
  },
  update: async (
    { params: { id }, body }: Request,
    res: Response,
  ) => {
    const candidate: CandidateProps = {
      ...body,
      id,
    };

    await candidateRepository.update(candidate);
  },
  remove: async ({ params: { id } }: Request, res: Response) => {
    await candidateRepository.remove(id);
    res.status(204).end();
  },
}

export default candidateController;