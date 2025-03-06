import { z } from 'zod';
import { SocialMediasSchema } from './social-medias';
import { ContactSchema } from './contact';
import { AddressSchema } from './address';
import Schema from '../utils/schema-builder';

const CompanyGallerySchema = z.object({
    url: z.string().url(),
    order: z.number().int().positive(),
})

const CompanySchema = z.object({
    id: z.string().uuid(),
    tradeName: z.string().min(3).max(100),
    legalName: z.string().min(3).max(100),
    cnpj: z.string().min(14).max(14),
    employeesQuantity: z.number().int().positive(),
    foundationYear: z.number().int().min(1900),
    social: SocialMediasSchema,
    about: z.string().max(500).nullable(),
    contact: ContactSchema,
    address: AddressSchema,
    mission: z.string().max(500).nullable(),
    vision: z.string().max(500).nullable(),
    values: z.array(z.string()).max(10).nullable(),
    industry: z.string().max(100),
    gallery: CompanyGallerySchema.array().max(10).nullable(),
    banner: z.string().url().nullable(),
    logo: z.string().url().nullable(),
});

export type CompanyGallery = z.infer<typeof CompanyGallerySchema>;

export type Company = Omit<z.infer<typeof CompanySchema>, 'gallery'> & {
    gallery: CompanyGallery[];
};

export type CompanyDto = Company | Omit<Company, 'cnpj'>;

export const CompanyPayloadSchema = CompanySchema.omit({
    id: true,
    banner: true,
    gallery: true,
    logo: true,
});

export type CompanyPayload = z.infer<typeof CompanyPayloadSchema>;

export const CompanyApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<Company>()
    .paginate()
    .sort(['tradeName', 'legalName', 'industry'])
    .filter([
        {
            field: 'industry',
            operators: ['eq', 'like', 'substring', 'startsWith', 'endsWith'],
        },
        {
            field: 'employeesQuantity',
            operators: 'eq',
        }
    ])
    .build(),
    Create: z.object({
        body: CompanyPayloadSchema.strict(),
    }),
    Update: Schema.paramsWithId().extend({
        body: CompanyPayloadSchema.strict(),
    }),
    Remove: Schema.paramsWithId(),
    SetBanner: Schema.paramsWithId().extend({
        ...Schema.file({
            allowedMimeTypes: ['image/png', 'image/jpeg'],
            maxFileSize: 5 * 1024 * 1024,
        }).shape
    }),
    SetLogo: Schema.paramsWithId().extend({
        ...Schema.file({
            allowedMimeTypes: ['image/png', 'image/jpeg'],
            maxFileSize: 5 * 1024 * 1024,
        }).shape
    }),
    SetGalleryItem: z.object({
        params: z.object({
            id: Schema.id(),
            order: z.number().int().positive(),
        }),
        ...Schema.file({
            allowedMimeTypes: ['image/png', 'image/jpeg'],
            maxFileSize: 5 * 1024 * 1024,
        }).shape
    }),
    RemoveGalleryItem: z.object({
        params: z.object({
            id: Schema.id(),
            order: z.number().int().positive(),
        }),
    })
}