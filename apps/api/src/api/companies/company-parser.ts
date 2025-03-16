import { Company, CompanyDto, CompanyPayload, DbParser, newUUID, Role } from '@talent-hub/shared';
import { CompanyModelAttr } from './company-model';

type CompanyParser = DbParser<Company, CompanyModelAttr> & {
    toDto: (args: { company: Company; userRole: Role }) => CompanyDto;

    newInstance: (company: CompanyPayload) => Company;

    merge: (args: { original: Company; changes: CompanyPayload }) => Company;
};

export const CompanyParser: CompanyParser = {
    toDb: (c) => ({
        ...c,
        ...c.social,
        contactPhone: c.contact.phone,
        contactEmail: c.contact.email,
    }),

    fromDb: ({
        youtube,
        linkedin,
        github,
        instagram,
        facebook,
        twitter,
        medium,
        website,
        contactPhone,
        contactEmail,
        ...rest
    }) => ({
        ...rest,
        social: {
            youtube,
            linkedin,
            github,
            instagram,
            facebook,
            twitter,
            medium,
            website,
        },
        contact: { phone: contactPhone, email: contactEmail },
    }),

    toDto: ({ company: { cnpj, ...rest }, userRole }) =>
        userRole === Role.Candidate ? { ...rest } : { ...rest, cnpj },

    newInstance: (payload) => ({
        id: newUUID(),
        ...payload,
        gallery: [],
        banner: null,
        logo: null,
    }),

    merge: ({ original, changes }) => ({
        id: original.id,
        ...changes,
        gallery: original.gallery,
        banner: original.banner,
        logo: original.logo,
    }),
};
