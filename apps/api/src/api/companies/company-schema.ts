import { z } from 'zod';

import { isValidCnpj } from '../../utils/document-validator';
import { RelatedWebsiteSchema } from '../../schemas/related-websites-schema';
import { ContactSchema } from '../../schemas/contact-schema';
import { AddressSchema } from '../../schemas/address-schema';
import { buildQuerySchema } from '../../utils/schemas';
import { Company } from './types/company';
import { ParamsSchema } from '../../schemas/params-schema';

export const FindCompanyByIdSchema = ParamsSchema;

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCompany:
 *       type: object
 *       properties:
 *         tradeName:
 *           type: string
 *           minLength: 1
 *           maxLength: 150
 *         legalName:
 *           type: string
 *           minLength: 1
 *           maxLength: 200
 *         cnpj:
 *           type: string
 *           length: 14
 *         employeesQuantity:
 *           type: integer
 *           minimum: 1
 *         foundationYear:
 *           type: integer
 *           minimum: 1900
 *         social:
 *           $ref: '#/components/schemas/RelatedWebsite'
 *         about:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *         contact:
 *           $ref: '#/components/schemas/Contact'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         bannerUrl:
 *           type: string
 *           format: url
 *           nullable: true
 *         logoUrl:
 *           type: string
 *           format: url
 *           nullable: true
 *         mission:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *         vision:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *         values:
 *           type: array
 *           items:
 *             type: string
 *           maxItems: 10
 *           nullable: true
 *         industry:
 *           type: string
 *           maxLength: 100
 */
export const CreateCompanySchema = z.object({
    body: z.object({
        tradeName: z.string().min(1).max(150),
        legalName: z.string().min(1).max(200),
        cnpj: z
            .string()
            .length(14)
            .refine((cnpj) => isValidCnpj({ cnpj }), { message: 'Invalid CNPJ' }),
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
    }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateCompany:
 *       type: object
 *       properties:
 *         params:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         body:
 *           $ref: '#/components/schemas/CreateCompany'
 */
export const UpdateCompanySchema = ParamsSchema.extend({
    body: CreateCompanySchema.partial(),
});

export const DeleteCompanySchema = ParamsSchema;

/**
 * @swagger
 * components:
 *   schemas:
 *     FindAllCompanies:
 *       type: object
 *       properties:
 *         query:
 *           type: object
 *           properties:
 *             searchFields:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                   operators:
 *                     type: array
 *                     items:
 *                       type: string
 *                   validation:
 *                     type: string
 *                   transform:
 *                     type: string
 *             sortFields:
 *               type: array
 *               items:
 *                 type: string
 */
export const FindAllCompaniesSchema = z.object({
    query: buildQuerySchema<Company & { hasOpenPositions: boolean }>({
        searchs: [
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
                validation: (value) => (isValidCnpj({ cnpj: value }) ? null : 'Invalid CNPJ'),
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
                validation: (value) => (Number(value) > 1800 ? null : 'invalid foundationYear'),
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
        sorts: [
            'tradeName',
            'legalName',
            'cnpj',
            'employeesQuantity',
            'foundationYear',
            'industry',
        ],
    }),
});
