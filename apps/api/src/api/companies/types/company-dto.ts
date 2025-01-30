import { Company } from './company';

export type CompanyDto = Company | Omit<Company, 'cnpj' | 'legalName'>;
