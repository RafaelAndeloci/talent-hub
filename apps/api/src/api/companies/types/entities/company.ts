import { Address } from '../../../../shared/types/address'
import { Contact } from '../../../../shared/types/contact'
import { Entity } from '../../../../shared/types/entity'
import { RelatedWebsites } from '../../../../shared/types/related-websites'

export interface Company extends Entity {
  tradeName: string
  legalName: string
  cnpj: string
  employeesQuantity: number
  foundationYear: number
  social: RelatedWebsites
  about: string | null
  contact: Contact
  address: Address
  bannerUrl: string | null
  logoUrl: string | null
  mission: string | null
  vision: string | null
  values: string[] | null
  industry: string
}
