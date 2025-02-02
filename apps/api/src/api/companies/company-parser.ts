import _ from 'lodash';

import { Role } from '../users/types/enums/role';
import { CompanyParser } from './types/company-parser';

export const companyParser: CompanyParser = {
    toDto: ({ company, userRole }) =>
        userRole === Role.candidate ? _.omit(company, ['cnpj']) : company,

    toDatabase: c => ({
        ...c,
        ...c.social,
        contactPhone: c.contact.phone,
        contactEmail: c.contact.email,
    }),

    fromDatabase: c => ({
        id: c.id,
        tradeName: c.tradeName,
        legalName: c.legalName,
        cnpj: c.cnpj,
        employeesQuantity: c.employeesQuantity,
        foundationYear: c.foundationYear,
        social: {
            linkedin: c.linkedin,
            github: c.github,
            instagram: c.instagram,
            facebook: c.facebook,
            twitter: c.twitter,
            youtube: c.youtube,
            medium: c.medium,
            website: c.website,
        },
        about: c.about,
        contact: { phone: c.contactPhone, email: c.contactEmail },
        location: c.location,
        bannerUrl: c.bannerUrl,
        logoUrl: c.logoUrl,
        mission: c.mission,
        vision: c.vision,
        values: c.values,
        industry: c.industry,
        gallery: c.gallery,
    }),
};
