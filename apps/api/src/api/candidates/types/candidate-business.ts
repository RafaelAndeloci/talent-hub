import { Candidate } from './candidate';
import { PagedList } from '../../../types/paged-list';
import { FileInput } from '../../../types/file-input';
import { Role } from '../../users/types/enums/role';
import { UpdateCandidatePayload } from './update-candidate-payload';
import { CreateCandidatePayload } from './create-candidate-payload';
import { FindAllCandidatesQuery } from './find-all-candidates-query';

export type CandidateBusiness = {
    create: (args: { userId: string; payload: CreateCandidatePayload }) => Promise<Candidate>;

    update: (args: { candidateId: string; payload: UpdateCandidatePayload }) => Promise<Candidate>;

    findById: (id: string) => Promise<Candidate>;

    findAll: (args: { query: FindAllCandidatesQuery }) => Promise<PagedList<Candidate>>;

    remove: (id: string) => Promise<void>;

    updateCv: (args: { candidateId: string; file: FileInput }) => Promise<Candidate>;

    updateBanner: (args: { candidateId: string; file: FileInput }) => Promise<Candidate>;

    validateForApplication: (args: { candidate: Candidate; userRole: Role }) => void;
};
