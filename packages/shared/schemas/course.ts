import { z } from 'zod';
import { AcademicDegreeType } from '../types/academic-degree-type';
import { SuggestionSchema } from './suggestion';
import Schema from '../utils/schema-builder';
import { SuggestionStatus } from '../types/suggestion-status';

const CourseSchema = z.object({
    id: Schema.id(),
    name: z.string(),
    degreeType: z.nativeEnum(AcademicDegreeType),
    suggestion: SuggestionSchema,
});

export const CoursePayloadSchema = CourseSchema.omit({ id: true, suggestion: true });

export const CourseDtoSchema = CourseSchema.omit({ suggestion: true }).extend({
    status: z.nativeEnum(SuggestionStatus),
});

export type Course = z.infer<typeof CourseSchema>;
export type CoursePayload = z.infer<typeof CoursePayloadSchema>;
export type CourseDto = z.infer<typeof CourseDtoSchema>;
