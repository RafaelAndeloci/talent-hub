import { z } from 'zod';

import { ParamsSchema } from '../../schemas/params-schema';
import {
    JobApplication,
    JobApplicationStatus,
    JobApplicationStage,
    FilterOperator,
} from '@talent-hub/shared/types';
import { buildQuerySchema } from '../../utils/schemas';

export const CreateJobApplicationSchema = z.object({
    body: z.object({
        candidateId: z.string().uuid(),
        coverLetter: z.string().min(3).max(1000).nullable().optional().default(null),
        jobOpeningId: z.string().uuid(),
    }),
});

export const FindJobApplicationByIdSchema = ParamsSchema;

export const FindAllJobApplicationsSchema = z.object({
    query: buildQuerySchema<JobApplication>({
        searches: [
            {
                field: 'status',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(JobApplicationStatus).includes(value as JobApplicationStatus)
                        ? null
                        : 'Invalid value',
            },
            {
                field: 'stage',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(JobApplicationStage).includes(value as JobApplicationStage)
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
        sorts: ['createdAt', 'updatedAt'],
    }),
});

export const DeleteJobApplicationSchema = ParamsSchema;

export const UpdateJobApplicationCoverLetterSchema = ParamsSchema.extend({
    body: CreateJobApplicationSchema.shape.body.pick({ coverLetter: true }).strict(),
});

export const UpdateJobApplicationStageSchema = ParamsSchema.extend({
    body: z
        .object({
            stage: z.nativeEnum(JobApplicationStage),
        })
        .strict(),
});

export const UpdateJobApplicationStatusSchema = ParamsSchema.extend({
    body: z
        .object({
            status: z.nativeEnum(JobApplicationStatus),
            rejectionReason: z.string().min(3).max(1000).nullable().optional().default(null),
        })
        .strict()
        .refine(
            ({ status, rejectionReason }) =>
                (status === JobApplicationStatus.rejected && rejectionReason !== null) ||
                status !== JobApplicationStatus.rejected,
            {
                message:
                    'rejectionReason is required when status is rejected and must be null otherwise',
            },
        ),
});
