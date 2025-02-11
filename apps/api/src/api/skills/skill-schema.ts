import { z } from 'zod';
import { ParamsSchema } from '../../schemas/params-schema';
import { buildQuerySchema } from '../../utils/schemas';
import {
    Skill,
    CreateSkillPayload,
    SkillType,
    SkillCategory,
    SuggestionStatus,
    FilterOperator,
} from '@talent-hub/shared';

export const FindSkillByIdSchema = ParamsSchema;

export const FindAllSkillsSchema = z.object({
    query: buildQuerySchema<Skill>({
        searches: [
            {
                field: 'type',
                operators: [FilterOperator.eq],
            },
            {
                field: 'status',
                operators: [FilterOperator.eq],
            },
        ],
        sorts: ['name', 'status', 'type'],
    }),
});

const CreateSkillPayloadSchema: Record<keyof CreateSkillPayload, z.ZodTypeAny> = {
    type: z.nativeEnum(SkillType),
    name: z.string(),
    categories: z.array(z.nativeEnum(SkillCategory)),
    tags: z.array(z.string().max(100)).default([]),
    relatedSkills: z.array(z.string().uuid()),
};

export const CreateSkillSchema = z.object({
    body: z.object(CreateSkillPayloadSchema).strict(),
});

export const UpdateSkillSchema = ParamsSchema.extend({
    body: CreateSkillSchema.shape.body.strict(),
});

export const DeleteSkillSchema = ParamsSchema;

export const UpdateSkillStatusSchema = ParamsSchema.extend({
    body: z
        .object({
            status: z.enum([SuggestionStatus.Approved, SuggestionStatus.Rejected]),
        })
        .strict(),
});
