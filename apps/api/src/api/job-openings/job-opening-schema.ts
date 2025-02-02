import { z } from 'zod';
import { buildQuerySchema } from '../../utils/schemas';
import { JobOpening } from './types/job-opening';
import { FilterOperator } from '../../enums/filter-operator';
import { PositionLevel } from '../candidates/types/enums/position-level';
import { WorkplaceType } from '../candidates/types/enums/workplace-type';
import { EmploymentType } from '../candidates/types/enums/employment-type';
import { ContractType } from '../candidates/types/enums/contract-type';
import { Benefit } from '../candidates/types/enums/benefit';
import moment from 'moment';
import _ from 'lodash';
import { ParamsSchema } from '../../schemas/params-schema';
import { JobOpeningStatus } from './types/enums/job-opening-status';

export const FindJobOpeningByIdSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const FindAllJobOpeningsSchema = z.object({
    query: buildQuerySchema<JobOpening>({
        sorts: [
            'title',
            'status',
            'positionLevel',
            'workplaceType',
            'employmentType',
            'salary',
            'contractType',
            'deadline',
        ],
        searches: [
            {
                field: 'title',
                operators: [FilterOperator.eq, FilterOperator.endsWith, FilterOperator.startsWith],
            },
            {
                field: 'status',
                operators: [FilterOperator.eq, FilterOperator.not, FilterOperator.in],
                validation: (status) =>
                    Object.values(JobOpeningStatus).includes(status as JobOpeningStatus)
                        ? null
                        : `Invalid status. Possible values: ${Object.values(JobOpeningStatus).join(', ')}`,
            },
            {
                field: 'positionLevel',
                operators: [FilterOperator.eq],
                validation: (level) =>
                    Object.values(PositionLevel).includes(level as PositionLevel)
                        ? null
                        : `Invalid position level. Possible values: ${Object.values(PositionLevel).join(', ')}`,
            },
            {
                field: 'workplaceType',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(WorkplaceType).includes(type as WorkplaceType)
                        ? null
                        : `Invalid workplace type. Possible values: ${Object.values(WorkplaceType).join(', ')}`,
            },
            {
                field: 'employmentType',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(EmploymentType).includes(type as EmploymentType)
                        ? null
                        : `Invalid employment type. Possible values: ${Object.values(EmploymentType).join(', ')}`,
            },
            {
                field: 'contractType',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(ContractType).includes(type as ContractType)
                        ? null
                        : `Invalid contract type. Possible values: ${Object.values(ContractType).join(', ')}`,
            },
            {
                field: 'deadline',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.gt,
                    FilterOperator.lt,
                    FilterOperator.gte,
                    FilterOperator.lte,
                ],
                transform: (value) => moment(value).toDate(),
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
                transform: (value) => parseFloat(value),
                validation: (value) => {
                    const num = parseFloat(value);
                    return isNaN(num) || num < 0 ? 'Invalid salary' : null;
                },
            },
            {
                field: 'benefits',
                operators: [FilterOperator.in, FilterOperator.notIn],
                validation: (benefit) =>
                    Object.values(Benefit).includes(benefit as Benefit)
                        ? null
                        : `Invalid benefit. Possible values: ${Object.values(Benefit).join(', ')}`,
            },
        ],
    }).strict(),
});

export const CreateJobOpeningSchema = z.object({
    body: z
        .object({
            title: z.string().min(3).max(100),
            description: z.string().min(3).max(1000),
            companyId: z.string().uuid(),
            positionLevel: z
                .string()
                .refine(
                    (value) => Object.values(PositionLevel).includes(value as PositionLevel),
                    `Invalid position level. Possible values: ${Object.values(PositionLevel).join(', ')}`,
                ),
            workplaceType: z
                .string()
                .refine(
                    (value) => Object.values(WorkplaceType).includes(value as WorkplaceType),
                    `Invalid workplace type. Possible values: ${Object.values(WorkplaceType).join(', ')}`,
                ),
            employmentType: z
                .string()
                .refine(
                    (value) => Object.values(EmploymentType).includes(value as EmploymentType),
                    `Invalid employment type. Possible values: ${Object.values(EmploymentType).join(', ')}`,
                ),
            salary: z.number().min(0).nullable(),
            contractType: z
                .string()
                .refine(
                    (value) => Object.values(ContractType).includes(value as ContractType),
                    `Invalid contract type. Possible values: ${Object.values(ContractType).join(', ')}`,
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
                const date = moment(value);
                return date.isValid() && date.isAfter(moment());
            }, 'Invalid deadline'),
            responsibilities: z
                .array(z.string().min(3).max(1000))
                .refine(
                    (res) => _.uniq(res).length === res.length,
                    'Responsibilities must be unique',
                ),
            requirements: z
                .array(z.string().min(3).max(1000))
                .refine((req) => _.uniq(req).length === req.length, 'Requirements must be unique'),
        })
        .strict(),
});

export const UpdateJobOpeningSchema = ParamsSchema.extend({
    body: CreateJobOpeningSchema.shape.body.omit({ companyId: true }).strict(),
});

export const DeleteJobOpeningSchema = ParamsSchema;

export const UpdateJobOpeningStatusSchema = ParamsSchema;

export const FillJobOpeningSchema = ParamsSchema.extend({
    body: z
        .object({
            selectedApplicationId: z.string().uuid(),
        })
        .strict(),
});
