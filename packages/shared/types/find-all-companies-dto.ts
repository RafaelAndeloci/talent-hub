import { CompanyDto } from './company-dto';
import { PagedResponse } from './paged-response';

export type FindAllCompaniesDto = PagedResponse<CompanyDto>;
