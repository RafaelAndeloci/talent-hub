import { FileInput } from '../../../types/file-input';
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

    setLogo: (args: { companyId: string; file: FileInput }) => Promise<CompanyDto>;

    setBanner: (args: { companyId: string; file: FileInput }) => Promise<CompanyDto>;

    setGaleryItem: (args: {
        companyId: string;
        picture: FileInput;
        order: number;
    }) => Promise<CompanyDto>;

    deleteGalleryItem: (args: { companyId: string; order?: number }) => Promise<CompanyDto>;
};
