// import { z } from 'zod';
// import { Role } from '../types/role';
// import { ParamsBuilder } from '../utils/schema-builder';

// const UserSchema = z.object({
//     id: z.string().uuid(),
//     email: z.string().email(),
//     //user
//     username: z.string().regex

// const passwordRule = z
//     .string()
//     .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
//         'password must contain at least one lowercase letter, one uppercase letter, and one number and be between 8 and 20 characters long',
//     );

// export const CreateUserSchema = z.object({
//     body: z.object({
//         email: z.string().email(),
//         password: passwordRule,
//         username: z.string().min(3).max(20),
//         role: z.nativeEnum(Role),
//     }),
// });

// export const AuthSchema = z.object({
//     body: z.object({
//         identifier: z.string(),
//         password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
//     }),
// });

// export const UpdateProfilePictureSchema = new ParamsBuilder().withId().extend({
//     file: z.object({
//         buffer: z.any(),
//         mimetype: z.string(),
//     }),
// });

// export const RemoveUserSchema = new ParamsBuilder().withId();

// export const FindAllUsersSchema = z.object({
//     query: buildQuerySchema<User>({
//         searches: [
//             {
//                 field: 'email',
//                 operators: [
//                     FilterOperator.eq,
//                     FilterOperator.like,
//                     FilterOperator.iLike,
//                     FilterOperator.startsWith,
//                     FilterOperator.endsWith,
//                 ],
//             },
//             {
//                 field: 'username',
//                 operators: [
//                     FilterOperator.eq,
//                     FilterOperator.like,
//                     FilterOperator.iLike,
//                     FilterOperator.startsWith,
//                     FilterOperator.endsWith,
//                 ],
//             },
//             {
//                 field: 'createdAt',
//                 operators: [
//                     FilterOperator.eq,
//                     FilterOperator.gt,
//                     FilterOperator.lt,
//                     FilterOperator.gte,
//                     FilterOperator.lte,
//                 ],
//             },
//         ],
//         sorts: ['email', 'username', 'createdAt'],
//     }),
// });

// export const FindUserByIdSchema = ParamsSchema;

// export const SendPasswordChangeTokenSchema = z.object({
//     body: z.object({
//         identifier: z.string(),
//     }),
// });

// export const ConfirmPasswordChangeSchema = ParamsSchema.extend({
//     body: z.object({
//         token: z.string(),
//         password: passwordRule,
//     }),
// });

// export const ConfirmEmailSchema = ParamsSchema.extend({
//     body: z.object({
//         token: z.string(),
//     }),
// });
import { z } from 'zod';
import { Role } from '../types/role';
import { ParamsBuilder } from '../utils/schema-builder';
import moment from 'moment';

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

export const UpdateProfilePictureSchema = new ParamsBuilder().withId().extend({
    file: z.object({
        buffer: z.any(),
        mimetype: z.string(),
    }),
});

export const RemoveUserSchema = new ParamsBuilder().withId();

