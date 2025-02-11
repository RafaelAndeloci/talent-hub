import { Role } from '@talent-hub/shared/types';

export interface UserModelAttr {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    role: Role;
    profilePictureUrl: string | null;
    passwordResetToken: string | null;
    passwordResetExpiration: number | null;
    emailConfirmationToken: string | null;
    emailConfirmationTokenSentAt: Date | null;
    emailConfirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
