import { Candidate } from '@prisma/client';
import ApiError from '../../types/api-error';
import candidateRepository from './candidate-repository';
import CandidateBusiness from './types/candidate-business';
import CandidateDtoProps from './types/candidate-dto-props';
import * as uuid from 'uuid';
import userRepository from '../users/user-repository';

const candidateBusiness: CandidateBusiness = {
  async findById(id) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`Candidato com id ${id} não encontrado`);
    }

    return candidate as CandidateDtoProps;
  },

  async findAll(props) {
    const candidates = await candidateRepository.findAll(props);
    return candidates;
  },

  async create(payload) {
    if (
      !(await userRepository.exists({
        id: payload.userId,
      }))
    ) {
      ApiError.throwBadRequest(`invalid user`);
    }

    if (
      await candidateRepository.exists({
        OR: [{ userId: payload.userId }, { phone: payload.phone }],
      })
    ) {
      ApiError.throwBadRequest('candidate already exists');
    }

    const candidate: Candidate = {
      id: uuid.v4(),
      ...payload,
    };

    await candidateRepository.create(candidate);

    return candidate as CandidateDtoProps;
  },

  async update({ id, payload }) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`Candidato com id ${id} não encontrado`);
    }

    Object.assign(candidate, payload);

    await candidateRepository.update(candidate);
  },

  async remove(id) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`Candidato com id ${id} não encontrado`);
    }

    await candidateRepository.remove(id);
  },
};

export default candidateBusiness;
