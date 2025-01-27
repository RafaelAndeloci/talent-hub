import { makeRepository } from '../../shared/services/repository'
import { CompanyModel, CompanyModelAttr } from './company-model'
import { fromDatabase, toDatabase } from './company-parser'
import { Company } from './types/entities/company'

export const companyRepository = makeRepository<
  Company,
  CompanyModelAttr,
  CompanyModel
>({
  model: CompanyModel,
  toDatabase,
  fromDatabase,
})
