import { AcademicDegreeType, AcademicInstitutionDto, FilterOperator } from '@talent-hub/shared';
import { z } from 'zod';
import { ParamsSchema } from '../../schemas/params-schema';
import { buildQuerySchema } from '../../utils/schemas';

export const CreateSchema = z.object({
    body: z
        .object({
            name: z.string().min(3).max(100),
            city: z.string(),
            website: z.string().url(),
            offeredDegreeTypes: z.array(z.nativeEnum(AcademicDegreeType)).default([]),
        })
        .strict(),
});

export const FindByIdSchema = ParamsSchema;

export const FindAllSchema = z.object({
    query: buildQuerySchema<AcademicInstitutionDto>({
        searches: [
            {
                field: 'name',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.iLike,
                    FilterOperator.like,
                    FilterOperator.startsWith,
                    FilterOperator.endsWith,
                    FilterOperator.substring,
                ],
            },
        ],
        sorts: ['name', 'city'],
    }),
});

export const UpdateSchema = ParamsSchema.extend({
    body: CreateSchema.shape.body,
});

export const RemoveSchema = ParamsSchema;
