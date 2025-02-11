import { CandidateDto } from './candidate-dto';
import { PagedResponse } from './paged-response';

export type FindAllCandidatesDto = PagedResponse<CandidateDto>;
