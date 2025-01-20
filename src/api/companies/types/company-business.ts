import PagedList from '../../../types/paged-list';
import Company from './company';
import CreateCompanyPayload from './create-company-payload';
import FindAllCompanies from './find-all-companies';
import UpdateCompanyPayload from './update-company-payload';

export default interface CompanyBusiness {
  create: (payload: CreateCompanyPayload) => Promise<Company>;

  update: (id: string, payload: UpdateCompanyPayload) => Promise<Company>;

  remove: (id: string) => Promise<void>;

  findById: (id: string) => Promise<Company>;

  findAll: (params: FindAllCompanies) => Promise<PagedList<Company>>;
}
