import { Role } from '../../users/types/enums/role';
import { CompanyModelAttr } from '../company-model';
import { Company } from './company';
import { CompanyDto } from './company-dto';

export type CompanyParser = {
    toDatabase: (company: Company) => CompanyModelAttr;

    fromDatabase: (company: CompanyModelAttr) => Company;

    toDto: (args: { company: Company; userRole: Role }) => CompanyDto;
};
