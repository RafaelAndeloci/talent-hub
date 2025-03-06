import { z } from 'zod';
import { SocialMediasSchema } from './social-medias';
import { ContactSchema } from './contact';
import { AddressSchema } from './address';

//<schema>
export const CompanySchema = z.object({
    id: z.string().uuid(),
    tradeName: z.string(),
    legalName: z.string(),
    cnpj: z.string().length(14),
    employeesQuantity: z.number().int(),
    foundationYear: z.number().int(),
    social: SocialMediasSchema,
    about: z.string().nullable(),
    contact: ContactSchema,
    address: AddressSchema,
    mission: z.string().nullable(),
    vision: z.string().nullable(),
    values: z.array(z.string()).nullable(),
    industry: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CompanyPayloadSchema = CompanySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const FindCompanyByIdSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});

export const CreateCompanySchema = z.object({
    body: CompanyPayloadSchema,
});

export const UpdateCompanySchema = z.object({
    params: FindCompanyByIdSchema.shape.params,
    body: CompanyPayloadSchema,
});

export const DeleteCompanySchema = FindCompanyByIdSchema;

//TODO: Create a schema for the following routes
export const SetGaleryItemSchema = z.object({});

//TODO
export const SetBannerSchema = z.object({});

//TODO
export const RemoveGalleryItemSchema = z.object({});

//TODO
export const SetLogoSchema = z.object({});
//</schema>

//<type>
export type Company = z.infer<typeof CompanySchema>;

export type CompanyPayload = z.infer<typeof CompanyPayloadSchema>;
//</type>