import { z } from 'zod';
import { JobApplicationStage } from './types/enums/job-application-stage';
import { JobApplicationStatus } from './types/enums/job-application-status';
import { buildQuerySchema } from '../../utils/schemas';
import { JobApplication } from './types/job-application';
import { FilterOperator } from '../../enums/filter-operator';
import { ParamsSchema } from '../../schemas/params-schema';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateJobApplication:
 *       type: object
 *       properties:
 *         candidateId:
 *           type: string
 *           format: uuid
 *         coverLetter:
 *           type: string
 *           nullable: true
 *         jobOpeningId:
 *           type: string
 *           format: uuid
 */
export const CreateJobApplicationSchema = z.object({
    body: z.object({
        candidateId: z.string().uuid(),
        coverLetter: z.string().min(3).max(1000).nullable(),
        jobOpeningId: z.string().uuid(),
    }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateJobApplication:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [applied, inProgress, rejected, hired]
 *         stage:
 *           type: string
 *           enum: [screening, interview, offer, hired]
 *         rejection:
 *           type: object
 *           properties:
 *             rejectedBy:
 *               type: string
 *               format: uuid
 *             reason:
 *               type: string
 *         coverLetter:
 *           type: string
 */
export const UpdateJobApplicationSchema = ParamsSchema.extend({
    body: z.object({
        status: z
            .string()
            .refine(
                (status) =>
                    Object.values(JobApplicationStatus).includes(status as JobApplicationStatus),
                `Invalid status. Possible values: ${Object.values(JobApplicationStatus).join(', ')}`,
            ),
        stage: z
            .string()
            .refine(
                (stage) =>
                    Object.values(JobApplicationStage).includes(stage as JobApplicationStage),
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
});

export const FindJobApplicationByIdSchema = ParamsSchema;

/**
 * @swagger
 * components:
 *   schemas:
 *     FindAllJobApplications:
 *       type: object
 *       properties:
 *         filter:
 *           type: string
 *         sort:
 *           type: string
 *         page:
 *           type: number
 *         limit:
 *           type: number
 */
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
