import { z } from 'zod'
import { buildQuerySchema } from '../../shared/utils/schema-builder'
import { JobOpening } from './types/entities/job-opening'
import { FilterOperator } from '../../shared/enums/filter-operator'
import { JobOpeningStatus } from './types/enums/job-opening-status'
import { PositionLevel } from '../candidates/types/enums/position-level'
import { WorkplaceType } from '../candidates/types/enums/workplace-type'
import { EmploymentType } from '../candidates/types/enums/employment-type'
import { ContractType } from '../candidates/types/enums/contract-type'
import { Benefit } from '../candidates/types/enums/benefit'
import moment from 'moment'
import _ from 'lodash'

export const FindJobOpeningByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export const FindJobOpeningsSchema = z.object({
  query: buildQuerySchema<JobOpening>({
    sortFields: [
      'title',
      'status',
      'positionLevel',
      'workplaceType',
      'employmentType',
      'salary',
      'contractType',
      'deadline',
    ],
    searchFields: [
      {
        field: 'title',
        operators: [
          FilterOperator.eq,
          FilterOperator.endsWith,
          FilterOperator.startsWith,
        ],
      },
      { field: 'status', operators: [FilterOperator.eq] },
      { field: 'positionLevel', operators: [FilterOperator.eq] },
      { field: 'workplaceType', operators: [FilterOperator.eq] },
      { field: 'employmentType', operators: [FilterOperator.eq] },
      { field: 'salary', operators: [FilterOperator.eq] },
      { field: 'contractType', operators: [FilterOperator.eq] },
      {
        field: 'deadline',
        operators: [
          FilterOperator.eq,
          FilterOperator.gt,
          FilterOperator.lt,
          FilterOperator.gte,
          FilterOperator.lte,
        ],
      },
      {
        field: 'salary',
        operators: [
          FilterOperator.eq,
          FilterOperator.gt,
          FilterOperator.lt,
          FilterOperator.gte,
          FilterOperator.lte,
        ],
      },
      {
        field: 'benefits',
        operators: [FilterOperator.in, FilterOperator.notIn],
      },
    ],
  }),
})

export const CreateJobOpeningSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(1000),
    status: z
      .string()
      .refine(
        (status) =>
          Object.values(JobOpeningStatus).includes(status as JobOpeningStatus),
        `Invalid status. Possible values: ${Object.values(
          JobOpeningStatus,
        ).join(', ')}`,
      ),
    companyId: z.string().uuid(),
    positionLevel: z
      .string()
      .refine(
        (value) =>
          Object.values(PositionLevel).includes(value as PositionLevel),
        `Invalid position level. Possible values: ${Object.values(
          PositionLevel,
        ).join(', ')}`,
      ),
    workplaceType: z
      .string()
      .refine(
        (value) =>
          Object.values(WorkplaceType).includes(value as WorkplaceType),
        `Invalid workplace type. Possible values: ${Object.values(
          WorkplaceType,
        ).join(', ')}`,
      ),
    employmentType: z
      .string()
      .refine(
        (value) =>
          Object.values(EmploymentType).includes(value as EmploymentType),
        `Invalid employment type. Possible values: ${Object.values(
          EmploymentType,
        ).join(', ')}`,
      ),
    salary: z.number().min(0).nullable(),
    contractTyp: z
      .string()
      .refine(
        (value) => Object.values(ContractType).includes(value as ContractType),
        `Invalid contract type. Possible values: ${Object.values(
          ContractType,
        ).join(', ')}`,
      ),
    benefits: z.array(
      z
        .string()
        .refine(
          (value) => Object.values(Benefit).includes(value as Benefit),
          `Invalid benefit. Possible values: ${Object.values(Benefit).join(', ')}`,
        ),
    ),
    deadline: z.string().refine((value) => {
      const date = moment(value)
      return date.isValid() && date.isAfter(moment())
    }, 'Invalid deadline'),
    responsibilities: z
      .array(z.string().min(3).max(1000))
      .refine(
        (res) => _.uniq(res).length === res.length,
        'Responsibilities must be unique',
      ),
    requirements: z
      .array(z.string().min(3).max(1000))
      .refine(
        (req) => _.uniq(req).length === req.length,
        'Requirements must be unique',
      ),
  }),
})

export const UpdateJobOpeningSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: CreateJobOpeningSchema.shape.body.omit({ companyId: true }).partial(),
})

export const DeleteJobOpeningSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const UpdateJobOpeningStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const FillJobOpeningSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    selectedApplicationId: z.string().uuid(),
  }),
})
