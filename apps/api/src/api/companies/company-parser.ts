import _ from 'lodash';

import { Role } from '../users/types/enums/role';
import { CompanyParser } from './types/company-parser';

export const companyParser: CompanyParser = {
    toDto: ({ company, userRole }) =>
        userRole === Role.candidate ? _.omit(company, ['cnpj']) : company,

    toDatabase: c => ({
        ...c,
        linkedin: c.social.linkedin,
        github: c.social.github,
        instagram: c.social.instagram,
        facebook: c.social.facebook,
        twitter: c.social.twitter,
        youtube: c.social.youtube,
        medium: c.social.medium,
        website: c.social.website,
        contactPhone: c.contact.phone,
        contactEmail: c.contact.email,
        address: c.address,
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
        address: c.address,
        bannerUrl: c.bannerUrl,
        logoUrl: c.logoUrl,
        mission: c.mission,
        vision: c.vision,
        values: c.values,
        industry: c.industry,
    }),
};
