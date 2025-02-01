import { z } from 'zod';
import { Role } from './types/enums/role';
import { config } from '../../config/environment';
import { ParamsSchema } from '../../schemas/params-schema';
import { buildQuerySchema } from '../../utils/schemas';
import { User } from './types/user';

const passwordRule = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/);

export const CreateUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: passwordRule,
        username: z.string().min(3).max(20),
        role: z.enum(Object.freeze(Object.values(Role)) as readonly [string, ...string[]]),
    }),
});

export const AuthSchema = z.object({
    body: z.object({
        identifier: z.string(),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
    }),
});

export const UpdateProfilePictureSchema = ParamsSchema.extend({
    file: z.object({
        buffer: z
            .any()
            .refine(
                (value) =>
                    Buffer.isBuffer(value) &&
                    value.length > 0 &&
                    config.fileStorage.images.maxSize >= value.length,
                {
                    message: `File size must be less than ${config.fileStorage.images.maxSize}MB`,
                },
            ),
        mimetype: z
            .string()
            .refine(
                (value) => config.fileStorage.images.allowedTypes.includes(value),
                `Invalid file type. Allowed types: ${config.fileStorage.images.allowedTypes.join(', ')}`,
            ),
    }),
});

export const RemoveUserSchema = ParamsSchema;

export const FindAllUsersSchema = z.object({
    query: buildQuerySchema<User>({
        searches: [
            {
                field: 'email',
                operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
            },
            {
                field: 'username',
                operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
            },
            { field: 'createdAt', operators: ['eq', 'gt', 'lt', 'gte', 'lte'] },
        ],
        sorts: ['email', 'username', 'createdAt'],
    }),
});

export const FindUserByIdSchema = ParamsSchema;

export const SendPasswordChangeTokenSchema = z.object({
    body: z.object({
        identifier: z.string(),
    }),
});

export const ConfirmPasswordChangeSchema = ParamsSchema.extend({
    body: z.object({
        token: z.string(),
        password: passwordRule,
    }),
});
