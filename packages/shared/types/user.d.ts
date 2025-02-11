import { Role } from './role';
import { Id } from './id';

export type PasswordReset = {
    token: string;
    expiration: number;
};

export interface User extends Id {
    username: string;
    email: string;
    hashedPassword: string;
    passwordReset: PasswordReset | null;
    emailConfirmation: {
        token: string;
        sentAt: Date | null;
        confirmedAt: Date | null;
    } | null;
    profilePictureUrl: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
