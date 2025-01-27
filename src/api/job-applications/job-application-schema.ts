import { z } from 'zod'
import { JobApplicationStage } from './types/enums/job-application-stage'
import { JobApplicationStatus } from './types/enums/job-application-status'
import { buildQuerySchema } from '../../shared/utils/schema-builder'
import { JobApplication } from './types/entities/job-application'
import { FilterOperator } from '../../shared/enums/filter-operator'

export const CreateJobApplicationSchema = z.object({
  body: z.object({
    candidateId: z.string().uuid(),
    coverLetter: z.string().min(3).max(1000).nullable().default(null),
    jobOpeningId: z.string().uuid(),
  }),
})

export const UpdateJobApplicationSchema = z.object({
  body: z.object({
    status: z
      .string()
      .refine(
        (status) =>
          Object.values(JobApplicationStatus).includes(
            status as JobApplicationStatus,
          ),
        `Invalid status. Possible values: ${Object.values(JobApplicationStatus).join(', ')}`,
      ),
    stage: z
      .string()
      .refine(
        (stage) =>
          Object.values(JobApplicationStage).includes(
            stage as JobApplicationStage,
          ),
        `Invalid stage. Possible values: ${Object.values(JobApplicationStage).join(', ')}`,
      )
      .optional(),
    rejection: z
      .object({
        rejectedBy: z.string().uuid(),
        reason: z.string().min(3).max(1000),
      })
      .optional(),
    coverLetter: z.string().min(3).max(1000).optional(),
  }),
})

export const FindJobApplicationByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const FindAllJobApplicationsSchema = z.object({
  query: buildQuerySchema<JobApplication>({
    searchFields: [
      {
        field: 'status',
        operators: [FilterOperator.eq],
        validation: (value) =>
          Object.values(JobApplicationStatus).includes(
            value as JobApplicationStatus,
          )
            ? null
            : 'Invalid value',
      },
      {
        field: 'stage',
        operators: [FilterOperator.eq],
        validation: (value) =>
          Object.values(JobApplicationStage).includes(
            value as JobApplicationStage,
          )
            ? null
            : 'Invalid value',
      },
      {
        field: 'isAutoCreated',
        operators: [FilterOperator.eq],
        transform: (value) => value === 'true',
        validation: (value) =>
          value === 'true' || value === 'false' ? null : 'Invalid value',
      },
    ],
    sortFields: ['createdAt', 'updatedAt'],
  }),
})

export const DeleteJobApplicationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
