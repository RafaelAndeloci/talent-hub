import { FileInput } from '../../../types/file-input';
import { AuthDto } from './auth-dto';
import { AuthPayload } from './auth-payload';
import { ConfirmChangePasswordPayload } from './confirm-reset-password-payload';
import { CreateUserPayload } from './create-user-payload';
import { FindAllUsersDto } from './find-all-users-dto';
import { FindAllUsersQuery } from './find-all-users-query';
import { User } from './user';
import { UserDto } from './user-dto';

export type UserBusiness = {
    create: (args: { payload: CreateUserPayload }) => Promise<UserDto>;

    auth: (args: { payload: AuthPayload }) => Promise<AuthDto>;

    updateProfilePicture: (args: { userId: string; file: FileInput }) => Promise<UserDto>;

    findById: (args: { userId: string }) => Promise<UserDto>;

    findAll: (args: { query: FindAllUsersQuery }) => Promise<FindAllUsersDto>;

    remove: (args: { userId: string }) => Promise<void>;

    sendChangePasswordToken: (args: { identifier: string }) => Promise<void>;

    confirmChangePassword: (args: {
        userId: string;
        payload: ConfirmChangePasswordPayload;
    }) => Promise<void>;

    confirmEmail: (args: { userId: string; token: string }) => Promise<void>;

    canCreateCandidate: (args: { user: User | UserDto }) => boolean;
};
