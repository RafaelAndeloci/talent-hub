import { z } from 'zod';
import { SkillCategory } from '../types/skill-category';
import { Suggestion, SuggestionSchema } from './suggestion';
import Schema from '../utils/schema-builder';
import { SuggestionStatus } from '../types/suggestion-status';
import { SkillType } from '../types/skill-type';

export const SkillSchema = z.object({
    id: Schema.id(),
    name: z.string().max(150),
    type: z.nativeEnum(SkillType),
    categories: z.nativeEnum(SkillCategory).array().default([]),
    tags: z.string().max(150).array().default([]),
    suggestion: SuggestionSchema,
});

export const SkillDtoSchema = SkillSchema.omit({
    suggestion: true,
});

export const SkillPayloadSchema = SkillSchema.omit({
    id: true,
    suggestion: true,
});

export type Skill = Omit<z.infer<typeof SkillSchema>, 'suggestion'> & {
    suggestion: Suggestion;
};

export type SkillDto = Omit<Skill, 'suggestion'> & {
    status: SuggestionStatus;
};

export type SkillPayload = z.infer<typeof SkillPayloadSchema>;

export type UpdateSkillStatusPayload = {
    status: SuggestionStatus.Approved | SuggestionStatus.Rejected;
};


export const SkillApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<Skill & { status: SuggestionStatus }>()
        .sort(['name', 'type'])
        .filter([
            {
                field: 'name',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
            {
                field: 'type',
                operators: ['eq'],
            },
            {
                field: 'status',
                operators: ['eq'],
            },
        ])
        .build(),
    Create: z.object({
        body: SkillPayloadSchema,
    }),
    Update: Schema.paramsWithId().extend({
        body: SkillPayloadSchema,
    }),
    UpdateStatus: Schema.paramsWithId().extend({
        body: z.object({
            status: z.enum([SuggestionStatus.Approved, SuggestionStatus.Rejected]),
        }),
    }),
    Remove: Schema.paramsWithId(),
};