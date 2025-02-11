import { Company, CompanyDto, Role } from '@talent-hub/shared';
import { CompanyModelAttr } from './company-model-attr';

export type CompanyParser = {
    toDatabase: (company: Company) => CompanyModelAttr;

    fromDatabase: (company: CompanyModelAttr) => Company;

    toDto: (args: { company: Company; userRole: Role }) => CompanyDto;
};
