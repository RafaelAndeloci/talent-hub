import { z } from 'zod';
import { Role } from '../types/role';
import moment from 'moment';
import Schema from '../utils/schema-builder';

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

export const EmailConfirmationSchema = z.object({
    token: z.string(),
    sentAt: z.string().transform((value) => moment(value)),
    confirmedAt: z
        .string()
        .nullable()
        .transform((value) => (value === null ? null : moment(value))),
});

export const PasswordResetSchema = z.object({
    token: z.string(),
    expiresAt: z.string().transform((value) => moment(value)),
});

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string().min(3).max(20),
    role: z.nativeEnum(Role),
    hashedPassword: z.string(),
    profilePictureUrl: z.string().nullable(),
    emailConfirmation: EmailConfirmationSchema.nullable().default(null),
    passwordReset: PasswordResetSchema.nullable().default(null),
    createdAt: z.string().transform((value) => moment(value)),
    updatedAt: z.string().transform((value) => moment(value)),
});

export const UserPayloadSchema = UserSchema.pick({
    email: true,
    username: true,
    role: true,
}).extend({
    plainTextPassword: z.string().regex(passwordPattern),
});

export const CreateUserSchema = z.object({
    body: UserPayloadSchema,
});

export const AuthPayloadSchema = z.object({
    identifier: z.string(),
    password: z.string().regex(passwordPattern),
});

export const AuthSchema = z.object({
    body: AuthPayloadSchema,
});

export const UpdateProfilePictureSchema = Schema.paramsWithId().extend({
    ...Schema.file({
        allowedMimeTypes: ['image/png', 'image/jpeg'],
        maxFileSize: 10 * 1024 * 1024,
    }).shape,
});

export const RemoveUserSchema = Schema.paramsWithId();
