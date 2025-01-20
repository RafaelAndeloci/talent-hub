import { z } from 'zod';
import documentValidator from '../../utils/document-validator';
import schemaBuilder from '../../utils/schema-builder';

const companySchema = z.object({
  tradeName: z.string().min(3).max(255),
  legalName: z.string().min(3).max(255),
  cnpj: z.string().length(14).refine(documentValidator.isValidCnpj),
  websiteUrl: z.string().url().optional().nullable(),
  phone: z.string().length(11),
  recruitingEmail: z.string().email(),
  address: schemaBuilder.buildAddressSchema(),
  about: z.string().min(3).max(500),
  instagramUrl: z.string().url().optional().nullable(),
  linkedinUrl: z.string().url().optional().nullable(),
  values: z.array(z.string()).min(1).max(10),
  mission: z.string().min(3).max(500),
  vision: z.string().min(3).max(500),
  employerNumber: z.number().int().positive(),
  foundationYear: z
    .number()
    .int()
    .positive()
    .min(1900)
    .max(new Date().getFullYear()),
  //TODO: change to enum?
  industry: z.string().min(3).max(255),
});

const companySchemas = {
  create: z.object({
    body: companySchema,
  }),
  update: z.object({
    body: companySchema,
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  remove: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  findById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  findAll: z.object({
    query: schemaBuilder
      .buildQuery({
        searchFields: [
          'tradeName',
          'legalName',
          'cnpj',
          'industry',
          'employerNumber',
          'foundationYear',
        ],
        sortingFields: [
          'tradeName',
          'legalName',
          'cnpj',
          'industry',
          'employerNumber',
          'foundationYear',
        ],
      })
      .extend({
        hasOppenedJobOpportunities: z.boolean().optional().nullable(),
      }),
  }),
};

export default companySchemas;