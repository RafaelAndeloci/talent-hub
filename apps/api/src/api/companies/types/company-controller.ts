import { RequestHandler } from 'express';
import { Id } from '../../../types/id';
import { FindAllArgs } from '../../../types/find-all-args';
import { PagedList } from '../../../types/paged-list';
import { AuthContext } from '../../users/types/auth-context';
import { Company } from './company';
import { CompanyDto } from './company-dto';
import { UpdateCompanyPayload } from './update-company-payload';

export type CompanyController = {
    findById: RequestHandler<Id, CompanyDto, void, void, AuthContext>;
    findAll: RequestHandler<void, PagedList<CompanyDto>, void, FindAllArgs<Company>, AuthContext>;
    create: RequestHandler<void, CompanyDto, Omit<Company, 'id'>, void, AuthContext>;
    update: RequestHandler<Id, CompanyDto, UpdateCompanyPayload, void, AuthContext>;
    remove: RequestHandler<Id, void, void, void, AuthContext>;
};
