import { z } from 'zod';
import { AcademicDegreeLevel } from '../types/academic-degree-type';
import Schema from '../utils/schema-builder';
import { Suggestion, SuggestionSchema } from './suggestion';
import { SuggestionStatus } from '../types/suggestion-status';

export const AcademicInstitutionSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(150),
    city: z.string(),
    website: z.string().url(),
    offeredDegreeTypes: z.nativeEnum(AcademicDegreeLevel).array(),
    suggestion: SuggestionSchema,
});

export const AcademicInstitutionDtoSchema = AcademicInstitutionSchema.omit({
    suggestion: true,
}).extend({
    status: z.nativeEnum(SuggestionStatus),
});

export const AcademicInstitutionPayloadSchema = AcademicInstitutionDtoSchema.omit({
    id: true,
    status: true,
});

export const UpdateAcademicInstitutionStatusPayloadSchema = z.object({
    status: z.enum([SuggestionStatus.Approved, SuggestionStatus.Rejected]),
});

export type AcademicInstitution = Omit<z.infer<typeof AcademicInstitutionSchema>, 'suggestion'> & {
    suggestion: Suggestion;
};
export type AcademicInstitutionDto = z.infer<typeof AcademicInstitutionDtoSchema>;
export type AcademicInstitutionPayload = z.infer<typeof AcademicInstitutionPayloadSchema>;
export type UpdateAcademicInstitutionStatusPayload = z.infer<
    typeof UpdateAcademicInstitutionStatusPayloadSchema
>;

export const AcademicInstitutionApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<AcademicInstitution & { status: SuggestionStatus }>()
        .sort(['name', 'city', 'website'])
        .filter([
            {
                field: 'name',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
            {
                field: 'city',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
            {
                field: 'status',
                operators: ['eq'],
            },
        ])
        .build(),
    Create: z.object({
        body: AcademicInstitutionPayloadSchema,
    }),
    Update: Schema.paramsWithId().extend({
        body: AcademicInstitutionPayloadSchema,
    }),
    Remove: Schema.paramsWithId(),
    UpdateStatus: Schema.paramsWithId().extend({
        body: UpdateAcademicInstitutionStatusPayloadSchema,
    }),
};
