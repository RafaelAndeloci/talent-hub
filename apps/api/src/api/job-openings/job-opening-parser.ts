import _ from 'lodash'
import * as uuid from 'uuid'

import { Role } from '../users/types/enums/role'
import { JobOpeningDto } from './types/dtos/job-opening-dto'
import { JobOpening } from './types/entities/job-opening'

export const toDto = (jobOpening: JobOpening, role: Role): JobOpeningDto =>
  role === Role.candidate
    ? _.omit(jobOpening, ['selectedApplicationId'])
    : jobOpening

export const newInstance = (
  payload: Omit<JobOpening, 'hiredCandidateId' | 'id'>,
): JobOpening => ({
  id: uuid.v4(),
  title: payload.title,
  description: payload.description,
  status: payload.status,
  companyId: payload.companyId,
  selectedApplicationId: null,
  positionLevel: payload.positionLevel,
  workplaceType: payload.workplaceType,
  employmentType: payload.employmentType,
  salary: payload.salary,
  contractType: payload.contractType,
  benefits: payload.benefits,
  deadline: payload.deadline,
  responsibilities: payload.responsibilities,
  requirements: payload.requirements,
})

export const merge = (
  jobOpening: JobOpening,
  payload: Partial<
    Omit<JobOpening, 'hiredCandidateId' | 'id' | 'status' | 'companyId'>
  >,
): JobOpening => ({
  id: jobOpening.id,
  title: payload.title ?? jobOpening.title,
  description: payload.description ?? jobOpening.description,
  status: jobOpening.status,
  companyId: jobOpening.companyId,
  selectedApplicationId: jobOpening.selectedApplicationId,
  positionLevel: payload.positionLevel ?? jobOpening.positionLevel,
  workplaceType: payload.workplaceType ?? jobOpening.workplaceType,
  employmentType: payload.employmentType ?? jobOpening.employmentType,
  salary: payload.salary ?? jobOpening.salary,
  contractType: payload.contractType ?? jobOpening.contractType,
  benefits: payload.benefits ?? jobOpening.benefits,
  deadline: payload.deadline ?? jobOpening.deadline,
  responsibilities: payload.responsibilities ?? jobOpening.responsibilities,
  requirements: payload.requirements ?? jobOpening.requirements,
})
