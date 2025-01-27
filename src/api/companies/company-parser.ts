import _ from 'lodash'
import { Role } from '../users/types/enums/role'
import { CompanyModelAttr } from './company-model'
import { CompanyDto } from './types/dtos/company-dto'
import { Company } from './types/entities/company'

export const toDatabase = (c: Company): CompanyModelAttr => ({
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
})

export const fromDatabase = (c: CompanyModelAttr): Company => ({
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
})

export const toDto = (c: Company, userRole: Role): CompanyDto =>
  userRole === Role.candidate ? _.omit(c, ['cnpj']) : c

export const merge = (
  c: Company,
  payload: Partial<Omit<Company, 'id'>>,
): Company => ({
  ...c,
  ...payload,
  social: {
    ...c.social,
    ...payload.social,
  },
  contact: {
    ...c.contact,
    ...payload.contact,
  },
  address: {
    ...c.address,
    ...payload.address,
  },
})
