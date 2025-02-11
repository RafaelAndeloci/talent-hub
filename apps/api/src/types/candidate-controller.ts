import {
    CandidateDto,
    CreateCandidatePayload,
    AuthContext,
    Id,
    UpdateCandidatePayload,
    FindAllCandidatesDto,
    FindAllCandidatesQuery,
} from '@talent-hub/shared/types';
import { RequestHandler } from 'express';

export type CandidateController = {
    create: RequestHandler<void, CandidateDto, CreateCandidatePayload, void, AuthContext>;

    update: RequestHandler<Id, CandidateDto, UpdateCandidatePayload, void, AuthContext>;

    findById: RequestHandler<Id, CandidateDto, void, void, AuthContext>;

    findAll: RequestHandler<void, FindAllCandidatesDto, void, FindAllCandidatesQuery, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    updateCv: RequestHandler<Id, CandidateDto, void, void, AuthContext>;

    updateBanner: RequestHandler<Id, CandidateDto, void, void, AuthContext>;
};
