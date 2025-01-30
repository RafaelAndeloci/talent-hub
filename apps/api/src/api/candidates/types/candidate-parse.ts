import { CandidateModelAttr } from '../models/types/candidate-model-attr';
import { Candidate } from './candidate';
import { CreateCandidatePayload } from './create-candidate-payload';

export type CandidateParser = {
    newInstance: (args: { userId: string; payload: CreateCandidatePayload }) => Candidate;
    fromDatabase: (attr: CandidateModelAttr) => Candidate;
    toDatabase: (candidate: Candidate & { userId: string }) => CandidateModelAttr;
};
