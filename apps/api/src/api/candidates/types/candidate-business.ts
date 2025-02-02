import { FileInput } from '../../../types/file-input';
import { Role } from '../../users/types/enums/role';
import { UpdateCandidatePayload } from './update-candidate-payload';
import { CreateCandidatePayload } from './create-candidate-payload';
import { FindAllCandidatesQuery } from './find-all-candidates-query';
import { CandidateDto } from './candidate-dto';
import { FindAllCandidatesDto } from './find-all-candidates-dto';

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
