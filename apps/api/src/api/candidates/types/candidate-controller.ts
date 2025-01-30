import { RequestHandler } from 'express';
import { Id } from '../../../types/id';
import { AuthContext } from '../../users/types/auth-context';
import { Candidate } from './candidate';
import { CreateCandidatePayload } from './create-candidate-payload';
import { UpdateCandidatePayload } from './update-candidate-payload';
import { FindAllCandidatesDto } from './find-all-candidates-dto';
import { FindAllCandidatesQuery } from './find-all-candidates-query';

export type CandidateController = {
    create: RequestHandler<void, Candidate, CreateCandidatePayload, void, AuthContext>;

    update: RequestHandler<Id, Candidate, UpdateCandidatePayload, void, AuthContext>;

    findById: RequestHandler<Id, Candidate, void, void, AuthContext>;

    findAll: RequestHandler<void, FindAllCandidatesDto, void, FindAllCandidatesQuery, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    updateCv: RequestHandler<Id, Candidate, void, void, AuthContext>;

    updateBanner: RequestHandler<Id, Candidate, void, void, AuthContext>;
};
