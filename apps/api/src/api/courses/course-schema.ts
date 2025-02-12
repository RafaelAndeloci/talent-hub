import { z } from 'zod';
import { ParamsSchema } from '../../schemas/params-schema';
import { buildQuerySchema } from '../../utils/schemas';
import { AcademicDegreeType, CourseDto, FilterOperator } from '@talent-hub/shared';

export const FindByIdSchema = ParamsSchema;

export const FindAllSchema = z.object({
    query: buildQuerySchema<CourseDto>({
        searches: [
            {
                field: 'id',
                operators: [FilterOperator.eq],
            },
            {
                field: 'field',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.startsWith,
                    FilterOperator.endsWith,
                    FilterOperator.startsWith,
                    FilterOperator.like,
                    FilterOperator.iLike,
                ],
            },
        ],
        sorts: ['field', 'degreeType', 'status', 'name'],
    }),
});

export const CreateSchema = z.object({
    body: z
        .object({
            name: z.string().min(1).max(100),
            field: z.string().min(1).max(100),
            degreeType: z.nativeEnum(AcademicDegreeType),
            institution: z.object({
                id: z.string().uuid(),
            }),
        })
        .strict(),
});

export const UpdateSchema = ParamsSchema.extend({
    body: CreateSchema.shape.body.omit({ institution: true }).strict(),
});

export const DeleteSchema = ParamsSchema;