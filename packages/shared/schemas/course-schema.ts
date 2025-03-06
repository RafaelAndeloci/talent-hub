import { z } from 'zod';
import { ParamsSchema } from '../../schemas/params-schema';
import { AcademicDegreeType } from '@talent-hub/shared';

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