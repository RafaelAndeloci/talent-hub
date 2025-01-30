import { Id } from '../../../types/id';
import { Role } from './enums/role';

export type PasswordReset = {
    token: string;
    expiration: number;
};

export interface User extends Id {
    username: string;
    email: string;
    hashedPassword: string;
    passwordReset: PasswordReset | null;
    emailConfirmationToken: string | null;
    profilePictureUrl: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
