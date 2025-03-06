import { z } from 'zod';
import { JobApplicationStatus } from '../types/job-application-status';
import { JobApplicationStage } from '../types/job-application-stage';
import moment from 'moment';

// <schema>
export const JobApplicationRejectionSchema = z.object({
    reason: z.string(),
    date: z.string().transform((val) => moment(val)),
});

export const JobApplicationSchema = z.object({
    id: z.string().uuid(),
    candidate: z.object({
        id: z.string().uuid(),
        name: z.string().nullish().default(null),
    }),
    jobOpening: z.object({
        id: z.string().uuid(),
        title: z.string().nullish().default(null),
    }),
    coverLetter: z.string().nullable().default(null),
    status: z.nativeEnum(JobApplicationStatus),
    stage: z.nativeEnum(JobApplicationStage),
    isAutoCreated: z.boolean(),
    createdAt: z.string().transform((val) => moment(val)),
    updatedAt: z.string().transform((val) => moment(val)),
    rejection: JobApplicationRejectionSchema.nullable().default(null),
});

export const CreateJobApplicationPayloadSchema = JobApplicationSchema.pick({
    candidate: true,
    jobOpening: true,
    coverLetter: true,
});

export const UpdateJobApplicationCoverLetterPayloadSchema = JobApplicationSchema.pick({
    coverLetter: true,
});

export const UpdateJobApplicationStagePayloadSchema = JobApplicationSchema.pick({
    stage: true,
});

export const UpdateJobApplicationStatusPayloadSchema = JobApplicationSchema.pick({
    status: true,
    rejection: true,
}).refine(({ status, rejection }) => {
    if (status === JobApplicationStatus.rejected && !rejection) {
        return 'Rejection reason is required';
    }

    return true;
});
// </schema>

// <type>
export type JobApplication = z.infer<typeof JobApplicationSchema>;

export type CreateJobApplicationPayload = z.infer<typeof CreateJobApplicationPayloadSchema>;

export type UpdateJobApplicationCoverLetterPayload = z.infer<
    typeof UpdateJobApplicationCoverLetterPayloadSchema
>;

export type UpdateJobApplicationStagePayload = z.infer<
    typeof UpdateJobApplicationStagePayloadSchema
>;

export type UpdateJobApplicationStatusPayload = z.infer<
    typeof UpdateJobApplicationStatusPayloadSchema
>;
// </type>
