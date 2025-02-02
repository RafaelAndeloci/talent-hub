import { CandidateModelAttr } from '../models/types/candidate-model-attr';
import { Candidate } from './candidate';
import { CandidateDto } from './candidate-dto';
import { CreateCandidatePayload } from './create-candidate-payload';

export type CandidateParser = {
    newInstance: (args: { userId: string; payload: CreateCandidatePayload }) => Candidate;
    fromDatabase: (attr: CandidateModelAttr) => Candidate;
    toDatabase: (candidate: Candidate & { userId: string }) => CandidateModelAttr;
    toDto: (args: { candidate: Candidate }) => CandidateDto;
};
