import { Role } from '../../users/types/enums/role';
import { Company } from './company';
import { CompanyDto } from './company-dto';
import { CompanyModelAttr } from './company-model-attr';

export type CompanyParser = {
    toDatabase: (company: Company) => CompanyModelAttr;

    fromDatabase: (company: CompanyModelAttr) => Company;

    toDto: (args: { company: Company; userRole: Role }) => CompanyDto;
};
