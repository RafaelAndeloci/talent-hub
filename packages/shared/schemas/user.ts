import { z } from 'zod';
import Role from '../types/role';
import Schema from '../utils/schema-builder';

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const EmailConfirmationSchema = z.object({
    token: z.string().nullable(),
    sentAt: Schema.moment().nullable(),
    confirmedAt: Schema.moment().nullable(),
});

export const PasswordResetSchema = z.object({
    token: z.string(),
    expiresAt: Schema.moment(),
});

export const UserSchema = z.object({
    id: Schema.id(),
    username: z.string(),
    email: z.string().email(),
    hashedPassword: z.string(),
    profilePictureUrl: z.string().url().nullable(),
    role: z.nativeEnum(Role),
    emailConfirmation: EmailConfirmationSchema.nullable(),
    passwordReset: PasswordResetSchema.nullable(),
    createdAt: Schema.moment(),
    updatedAt: Schema.moment(),
});

export const ConfirmEmailPayloadSchema = z.object({
    token: z.string(),
});

export const EmailOrUsernameSchema = UserSchema.pick({
    email: true,
    username: true,
})
    .partial()
    .refine((data) => Boolean(data.email || data.username), {
        message: 'You must provide an email or a username',
    })
    .transform((data) => ({
        identifier: (data.email || data.username)!,
    }));

export const SendChangePasswordTokenPayloadSchema = EmailOrUsernameSchema;

export const ConfirmPasswordChangePayloadSchema = z.object({
    token: z.string(),
    password: z.string().regex(passwordPattern),
});

export const CreateUserPayloadSchema = UserSchema.pick({
    username: true,
    email: true,
    role: true,
})
    .extend({
        plainPassword: z.string().regex(passwordPattern),
    })
    .strict();

export const AuthPayloadSchema = EmailOrUsernameSchema.and(
    z.object({
        password: z.string(),
    }),
);

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;
export type EmailConfirmation = z.infer<typeof EmailConfirmationSchema>;
export type ConfirmEmailPayload = z.infer<typeof ConfirmEmailPayloadSchema>;
export type SendChangePasswordTokenPayload = z.infer<typeof SendChangePasswordTokenPayloadSchema>;
export type ConfirmPasswordChangePayload = z.infer<typeof ConfirmPasswordChangePayloadSchema>;
export type PasswordReset = z.infer<typeof PasswordResetSchema>;
export type User = Omit<z.infer<typeof UserSchema>, 'emailConfirmation' | 'passwordReset'> & {
    emailConfirmation: EmailConfirmation | null;
    passwordReset: PasswordReset | null;
};
export type UserDto = Omit<
    User,
    'hashedPassword' | 'deletedAt' | 'passwordReset' | 'emailConfirmation'
>;

export const UserApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<User>()
        .sort(['createdAt', 'updatedAt'])
        .filter([
            {
                field: 'role',
                operators: 'eq',
            },
            {
                field: 'email',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
            {
                field: 'username',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
        ])
        .build(),
    Create: z.object({
        body: CreateUserPayloadSchema,
    }),
    Auth: z.object({
        body: AuthPayloadSchema,
    }),
    SetProfilePicture: Schema.paramsWithId().extend(
        Schema.file({
            allowedMimeTypes: ['image/png', 'image/jpeg'],
            maxFileSize: 10 * 1024,
        }).shape,
    ),
    Remove: Schema.paramsWithId(),
    SendChangePasswordToken: z.object({
        body: SendChangePasswordTokenPayloadSchema,
    }),
    ConfirmChangePassword: Schema.paramsWithId().extend({
        body: ConfirmPasswordChangePayloadSchema,
    }),
    ConfirmEmail: Schema.paramsWithId().extend({
        body: ConfirmEmailPayloadSchema,
    }),
};
