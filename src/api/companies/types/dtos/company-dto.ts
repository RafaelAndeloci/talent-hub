import { Company } from '../entities/company'

export type CompanyDto = Company | Omit<Company, 'cnpj' | 'legalName'>
