import {
    CandidateDto,
    CreateCandidatePayload,
    FindAllCandidatesDto,
    FindAllCandidatesQuery,
    Role,
    UpdateCandidatePayload,
} from '@talent-hub/shared';
import { FileInput } from './file-input';

export type CandidateBusiness = {
    findAll: (args: { query: FindAllCandidatesQuery }) => Promise<FindAllCandidatesDto>;

    findById: (id: string) => Promise<CandidateDto>;

    create: (args: { userId: string; payload: CreateCandidatePayload }) => Promise<CandidateDto>;

    update: (args: {
        candidateId: string;
        payload: UpdateCandidatePayload;
    }) => Promise<CandidateDto>;

    remove: (id: string) => Promise<void>;

    updateCv: (args: { candidateId: string; file: FileInput }) => Promise<CandidateDto>;

    updateBanner: (args: { candidateId: string; file: FileInput }) => Promise<CandidateDto>;

    validateForApplication: (args: { candidate: CandidateDto; userRole: Role }) => void;
};
