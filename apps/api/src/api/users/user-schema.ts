import { z } from 'zod';
import { Role } from './types/enums/role';
import { config } from '../../config/environment';
import { ParamsSchema } from '../../schemas/params-schema';
import { buildQuerySchema } from '../../utils/schemas';
import { User } from './types/user';

const passwordRule = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/);

/**
 * @swagger
 * components:
 *  schemas:
 *   CreateUserSchema:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      format: email
 *      example: pedro.lima47@fatec.sp.gov.br
 *     password:
 *      type: string
 *      description: Password with at least one uppercase letter, one lowercase letter, and one number, between 8-20 characters.
 *      example: as@a#1234Abbcs
 *     username:
 *      type: string
 *      description: Username between 3 and 20 characters.
 *      example: pedro.lima
 *     role:
 *      $ref: '#/components/schemas/RoleSchema'
 */
export const CreateUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: passwordRule,
        username: z.string().min(3).max(20),
        role: z.enum(Object.freeze(Object.values(Role)) as readonly [string, ...string[]]),
    }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *   AuthSchema:
 *    type: object
 *    properties:
 *     usernameOrEmail:
 *      type: string
 *      description: Username or email of the user.
 *     password:
 *      type: string
 *      description: User password.
 */
export const AuthSchema = z.object({
    body: z.object({
        usernameOrEmail: z.string(),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
    }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *   UpdateProfilePictureSchema:
 *    type: object
 *    properties:
 *     params:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        description: User ID.
 *     body:
 *      type: object
 *      properties:
 *       userId:
 *        type: string
 *        description: ID of the user.
 *       file:
 *        type: object
 *        properties:
 *         content:
 *          type: string
 *         contentType:
 *          type: string
 */
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

/**
 * @swagger
 * components:
 *  schemas:
 *   FindAllUsersSchema:
 *    type: object
 *    properties:
 *     query:
 *      type: object
 *      description: Query parameters for filtering and sorting users.
 */
export const FindAllUsersSchema = z.object({
    query: buildQuerySchema<User>({
        searchs: [
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

/**
 * @swagger
 * components:
 *  schemas:
 *   SendResetPasswordTokenSchema:
 *    type: object
 *    properties:
 *     body:
 *      type: object
 *      description: Either email or username is required.
 */
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
