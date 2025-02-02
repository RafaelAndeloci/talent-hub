import { z } from 'zod';

export const ParamsSchema = z.object({
    params: z
        .object({
            id: z.string(),
        })
        .strict(),
});
