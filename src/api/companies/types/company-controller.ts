import { Request, Response } from 'express';
import Company from './company';
import CreateCompanyPayload from './create-company-payload';
import UpdateCompanyPayload from './update-company-payload';
import PagedList from '../../../types/paged-list';
import FindAllCompanies from './find-all-companies';

export default interface CompanyController {
  create: (
    req: Request<void, void, CreateCompanyPayload>,
    res: Response<Company>,
  ) => Promise<void>;

  update: (
    req: Request<{ id: string }, void, UpdateCompanyPayload>,
    res: Response<Company>,
  ) => Promise<void>;

  remove: (req: Request<{ id: string }>, res: Response<void>) => Promise<void>;

  findById: (
    req: Request<{ id: string }>,
    res: Response<Company>,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindAllCompanies>,
    res: Response<PagedList<Company>>,
  ) => Promise<void>;
}
