import { AuthContext } from '../../users/types/auth-context';
import { CompanyDto } from './company-dto';
import { CreateCompanyPayload } from './create-company-payload';
import { FindAllCompaniesDto } from './find-all-companies-dto';
import { FindAllCompaniesQuery } from './find-all-companies-query';
import { UpdateCompanyPayload } from './update-company-payload';

export type CompanyBusiness = {
    create: (args: { payload: CreateCompanyPayload; context: AuthContext }) => Promise<CompanyDto>;

    update: (args: {
        companyId: string;
        payload: UpdateCompanyPayload;
        context: AuthContext;
    }) => Promise<CompanyDto>;

    findById: (args: { companyId: string; context: AuthContext }) => Promise<CompanyDto>;

    findAll: (args: {
        query: FindAllCompaniesQuery;
        context: AuthContext;
    }) => Promise<FindAllCompaniesDto>;

    remove: (args: { companyId: string; context: AuthContext }) => Promise<void>;
};
