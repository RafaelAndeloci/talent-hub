import { z } from 'zod'
import { Role } from './types/enums/role'
import { buildQuerySchema } from '../../shared/utils/schema-builder'
import { User } from './types/entities/user'
import { config } from '../../config/environment'

const passwordRule = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/)

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
    role: z.enum(
      Object.freeze(Object.values(Role)) as readonly [string, ...string[]],
    ),
  }),
})

/**
 * @swagger
 * components:
 *  schemas:
 *   AuthSchema:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      format: email
 *      description: Email of the user (optional if username is provided).
 *     username:
 *      type: string
 *      description: Username of the user (optional if email is provided).
 *     password:
 *      type: string
 *      description: User password.
 */
export const AuthSchema = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
      username: z.string().min(3).max(20).optional(),
    })
    .refine((data) => !!data.email || !!data.username, {
      message: 'email or username is required',
    }),
})

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
export const UpdateProfilePictureSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
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
})

/**
 * @swagger
 * components:
 *  schemas:
 *   RemoveUserSchema:
 *    type: object
 *    properties:
 *     params:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        description: ID of the user to be removed.
 */
export const RemoveUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

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
  query: buildQuerySchema<User & { createdAt: Date }>({
    searchFields: [
      {
        field: 'email',
        operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
      },
      {
        field: 'username',
        operators: ['eq', 'like', 'iLike', 'startsWith', 'endsWith'],
      },
      {
        field: 'createdAt',
        operators: ['eq', 'gt', 'lt', 'gte', 'lte'],
      },
    ],
    sortFields: ['email', 'username', 'createdAt'],
  }),
})

/**
 * @swagger
 * components:
 *  schemas:
 *   FindUserByIdSchema:
 *    type: object
 *    properties:
 *     params:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        description: ID of the user.
 */
export const FindUserByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

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
export const SendResetPasswordTokenSchema = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      username: z.string().min(3).max(20).optional(),
    })
    .refine((data) => !!data.email || !!data.username, {
      message: 'email or username is required',
    }),
})

/**
 * @swagger
 * components:
 *  schemas:
 *   ConfirmResetPasswordSchema:
 *    type: object
 *    properties:
 *     body:
 *      type: object
 *      properties:
 *       userId:
 *        type: string
 *        format: uuid
 *       token:
 *        type: string
 *       password:
 *        type: string
 *        description: New password for the user.
 */
export const ConfirmResetPasswordSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    token: z.string(),
    password: passwordRule,
  }),
})
