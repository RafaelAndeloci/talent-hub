import { Candidate, CandidateDto, CreateCandidatePayload } from '@talent-hub/shared/types';
import { CandidateModelAttr } from './candidate-model-attr';

export type CandidateParser = {
    newInstance: (args: { userId: string; payload: CreateCandidatePayload }) => Candidate;
    fromDatabase: (attr: CandidateModelAttr) => Candidate;
    toDatabase: (candidate: Candidate & { userId: string }) => CandidateModelAttr;
    toDto: (args: { candidate: Candidate }) => CandidateDto;
};
