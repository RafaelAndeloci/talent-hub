import { makeRepository } from '../../services/repository';
import { CompanyModel, CompanyModelAttr } from './company-model';
import { Company } from './types/company';
import { companyParser } from './company-parser';

export const companyRepository = makeRepository<Company, CompanyModelAttr, CompanyModel>({
    model: CompanyModel,
    toDatabase: companyParser.toDatabase,
    fromDatabase: companyParser.fromDatabase,
});
