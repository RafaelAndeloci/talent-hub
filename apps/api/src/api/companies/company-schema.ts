import { z } from 'zod';

import { isValidCnpj } from '../../utils/document-validator';
import { RelatedWebsiteSchema } from '../../schemas/related-websites-schema';
import { ContactSchema } from '../../schemas/contact-schema';
import { buildQuerySchema } from '../../utils/schemas';
import { ParamsSchema } from '../../schemas/params-schema';
import { FileImageSchema } from '../../schemas/image-file-schema';
import { config } from '../../config/environment';
import { Uf, Company, FilterOperator } from '@talent-hub/shared';

export const FindCompanyByIdSchema = ParamsSchema;

export const CreateCompanySchema = z.object({
    body: z
        .object({
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
            location: z
                .object({
                    neighborhood: z.string().max(100),
                    uf: z.nativeEnum(Uf),
                    city: z.string().max(100),
                })
                .strict(),
            mission: z.string().max(500).nullable(),
            vision: z.string().max(500).nullable(),
            values: z.array(z.string()).max(10).nullable(),
            industry: z.string().max(100),
        })
        .strict(),
});

export const UpdateCompanySchema = ParamsSchema.extend({
    body: CreateCompanySchema.shape.body,
});

export const DeleteCompanySchema = ParamsSchema;

export const FindAllCompaniesSchema = z.object({
    query: buildQuerySchema<Company & { hasOpenPositions: boolean }>({
        searches: [
            { field: 'id', operators: [FilterOperator.eq] },
            {
                field: 'tradeName',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.startsWith,
                    FilterOperator.endsWith,
                ],
            },
            {
                field: 'legalName',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.startsWith,
                    FilterOperator.endsWith,
                ],
            },
            {
                field: 'cnpj',
                operators: [FilterOperator.eq],
                validation: (value) => (isValidCnpj({ cnpj: value }) ? null : 'Invalid CNPJ'),
            },
            {
                field: 'employeesQuantity',
                operators: [FilterOperator.eq, FilterOperator.gt, FilterOperator.lt],
                transform: (value) => Number(value),
                validation: (value) =>
                    Number(value) > 0 ? null : 'employeesQuantity must be greater than 0',
            },
            {
                field: 'foundationYear',
                operators: [FilterOperator.eq, FilterOperator.gt, FilterOperator.lt],
                transform: (value) => Number(value),
                validation: (value) => (Number(value) > 1800 ? null : 'invalid foundationYear'),
            },
            {
                field: 'industry',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.startsWith,
                    FilterOperator.endsWith,
                ],
            },
            {
                field: 'hasOpenPositions',
                operators: [FilterOperator.eq],
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
    }).strict(),
});

export const SetGaleryItemSchema = z.object({
    params: ParamsSchema.shape.params
        .extend({
            order: z
                .string()
                .transform(Number)
                .refine((value) => value >= 0 && value < config.company.maxGallerySize, {
                    message: `index must be between 1 and ${config.company.maxGallerySize}`,
                }),
        })
        .strict(),
    file: FileImageSchema.shape.file,
});

export const SetBannerSchema = ParamsSchema.merge(FileImageSchema);

export const RemoveGalleryItemSchema = z.object({
    params: ParamsSchema.shape.params.extend({
        order: SetGaleryItemSchema.shape.params.shape.order.optional().nullable().default(null),
    }),
});

export const SetLogoSchema = ParamsSchema.merge(FileImageSchema);
