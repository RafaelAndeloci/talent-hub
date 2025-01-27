import { Op } from 'sequelize'
import * as uuid from 'uuid'

import { ApiError } from '../../shared/types/api-error'
import { FindAllArgs } from '../../shared/types/find-all-args'
import { Role } from '../users/types/enums/role'
import { merge, toDto } from './company-parser'
import { companyRepository } from './company-repository'
import { Company } from './types/entities/company'

export const companyBusiness = {
  async findById(id: string, userRole: Role) {
    const company = await companyRepository.findById(id)
    if (!company) ApiError.throwNotFound(`company with id ${id} not found`)

    return toDto(company!, userRole)
  },

  async findAll(args: FindAllArgs<Company>, userRole: Role) {
    const companies = await companyRepository.findAll(args)
    return companies.parse((company) => toDto(company, userRole))
  },

  async create(payload: Omit<Company, 'id'>) {
    const existing = await companyRepository.findUnique({
      [Op.or]: [{ cnpj: payload.cnpj }, { legalName: payload.legalName }],
    })
    if (existing) ApiError.throwConflict('company already exists')

    const company: Company = {
      id: uuid.v4(),
      ...payload,
    }

    await companyRepository.create(company)

    return toDto(company, Role.companyAdmin)
  },

  async update(id: string, payload: Partial<Omit<Company, 'id'>>) {
    const company = await companyRepository.findById(id)
    if (!company) ApiError.throwNotFound(`company with id ${id} not found`)

    const updated = merge(company!, payload)
    await companyRepository.update(updated)

    return toDto({ ...company!, ...payload }, Role.companyAdmin)
  },

  async remove(id: string) {
    const company = await companyRepository.findById(id)
    if (!company) ApiError.throwNotFound(`company with id ${id} not found`)

    await companyRepository.deleteById(id)
  },
}
