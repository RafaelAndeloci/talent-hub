import { RequestHandler } from 'express';
import { Id } from '../../../types/id';
import { AuthContext } from '../../users/types/auth-context';
import { CreateCandidatePayload } from './create-candidate-payload';
import { UpdateCandidatePayload } from './update-candidate-payload';
import { FindAllCandidatesDto } from './find-all-candidates-dto';
import { FindAllCandidatesQuery } from './find-all-candidates-query';
import { CandidateDto } from './candidate-dto';

export type CandidateController = {
    create: RequestHandler<void, CandidateDto, CreateCandidatePayload, void, AuthContext>;

    update: RequestHandler<Id, CandidateDto, UpdateCandidatePayload, void, AuthContext>;

    findById: RequestHandler<Id, CandidateDto, void, void, AuthContext>;

    findAll: RequestHandler<void, FindAllCandidatesDto, void, FindAllCandidatesQuery, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    updateCv: RequestHandler<Id, CandidateDto, void, void, AuthContext>;

    updateBanner: RequestHandler<Id, CandidateDto, void, void, AuthContext>;
};
