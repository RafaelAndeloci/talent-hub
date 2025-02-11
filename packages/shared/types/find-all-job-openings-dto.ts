import { JobOpeningDto } from './job-opening-dto';
import { PagedResponse } from './paged-response';

export type FindAllJobOpeningsDto = PagedResponse<JobOpeningDto>;
