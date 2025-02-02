import { makeRepository } from '../../services/repository';
import { CompanyModel } from './company-model';
import { Company } from './types/company';
import { companyParser } from './company-parser';
import { CompanyModelAttr } from './types/company-model-attr';

export const companyRepository = makeRepository<Company, CompanyModelAttr, CompanyModel>({
    model: CompanyModel,
    toDatabase: companyParser.toDatabase,
    fromDatabase: companyParser.fromDatabase,
});
