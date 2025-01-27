import { z } from 'zod'

import { isValidCnpj } from '../../shared/utils/document-validator'
import { RelatedWebsiteSchema } from '../../shared/schemas/related-websites-schema'
import { ContactSchema } from '../../shared/schemas/contact-schema'
import { AddressSchema } from '../../shared/schemas/address-schema'
import { buildQuerySchema } from '../../shared/utils/schema-builder'
import { Company } from './types/entities/company'

export const FindCompanyByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export const CreateCompanySchema = z.object({
  tradeName: z.string().min(1).max(150),
  legalName: z.string().min(1).max(200),
  cnpj: z
    .string()
    .length(14)
    .refine((cnpj) => isValidCnpj(cnpj), { message: 'Invalid CNPJ' }),
  employeesQuantity: z.number().int().min(1),
  foundationYear: z.number().int().min(1900),
  social: RelatedWebsiteSchema,
  about: z.string().max(500).nullable(),
  contact: ContactSchema,
  address: AddressSchema,
  bannerUrl: z.string().url().nullable(),
  logoUrl: z.string().url().nullable(),
  mission: z.string().max(500).nullable(),
  vision: z.string().max(500).nullable(),
  values: z.array(z.string()).max(10).nullable(),
  industry: z.string().max(100),
})

export const UpdateCompanySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: CreateCompanySchema.partial(),
})

export const DeleteCompanySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export const FindAllCompaniesSchema = z.object({
  query: buildQuerySchema<Company & { hasOpenPositions: boolean }>({
    searchFields: [
      { field: 'id', operators: ['eq'] },
      {
        field: 'tradeName',
        operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
      },
      {
        field: 'legalName',
        operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
      },
      {
        field: 'cnpj',
        operators: ['eq'],
        validation: (value) => (isValidCnpj(value) ? null : 'Invalid CNPJ'),
      },
      {
        field: 'employeesQuantity',
        operators: ['eq', 'gt', 'lt'],
        transform: (value) => Number(value),
        validation: (value) =>
          Number(value) > 0 ? null : 'employeesQuantity must be greater than 0',
      },
      {
        field: 'foundationYear',
        operators: ['eq', 'gt', 'lt'],
        transform: (value) => Number(value),
        validation: (value) =>
          Number(value) > 1800 ? null : 'invalid foundationYear',
      },
      {
        field: 'industry',
        operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
      },
      {
        field: 'hasOpenPositions',
        operators: ['eq'],
        validation: (value) =>
          value === 'true' || value === 'false'
            ? null
            : 'invalid value for hasOpenPositions',
        transform: (value) => value === 'true',
      },
    ],
    sortFields: [
      'tradeName',
      'legalName',
      'cnpj',
      'employeesQuantity',
      'foundationYear',
      'industry',
    ],
  }),
})
