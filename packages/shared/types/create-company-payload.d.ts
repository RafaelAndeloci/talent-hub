import { Company } from './company';

export type CreateCompanyPayload = Omit<Company, 'id'>
