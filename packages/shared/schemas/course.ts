import { z } from 'zod';
import { AcademicDegreeLevel } from '../types/academic-degree-type';
import { SuggestionSchema } from './suggestion';
import Schema from '../utils/schema-builder';
import { SuggestionStatus } from '../types/suggestion-status';

const CourseSchema = z.object({
    id: Schema.id(),
    name: z.string(),
    degreeType: z.nativeEnum(AcademicDegreeLevel),
    suggestion: SuggestionSchema,
});

export const CoursePayloadSchema = CourseSchema.omit({ id: true, suggestion: true });

export const CourseDtoSchema = CourseSchema.omit({ suggestion: true }).extend({
    status: z.nativeEnum(SuggestionStatus),
});

export const UpdateStatusPayloadSchema = z.object({
    status: z.enum([SuggestionStatus.Approved, SuggestionStatus.Rejected]),
});

export type Course = z.infer<typeof CourseSchema>;
export type CoursePayload = z.infer<typeof CoursePayloadSchema>;
export type CourseDto = z.infer<typeof CourseDtoSchema>;
export type UpdateStatusPayload = z.infer<typeof UpdateStatusPayloadSchema>;

export const CourseApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<Course>().paginate().sort(
        ['name', 'degreeType'],
    ).filter([
        {
            field: 'name',
            operators: ['eq', 'like', 'startsWith', 'endsWith'],
        },
        {
            field: 'degreeType',
            operators: ['eq'],
        },
    ]).build(),
    Create: z.object({
        body: CoursePayloadSchema,
    }),
    Update: Schema.paramsWithId().extend({
        body: CoursePayloadSchema,
    }),
    UpdateStatus: Schema.paramsWithId().extend({
        params: UpdateStatusPayloadSchema,
    }),
    Remove: Schema.paramsWithId(),
}
