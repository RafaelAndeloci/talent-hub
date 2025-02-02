import { CreateCandidatePayload } from './create-candidate-payload';

export type UpdateCandidatePayload = Omit<CreateCandidatePayload, 'cvUrl' | 'bannerUrl'>;
