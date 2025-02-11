import {
    UserDto,
    AuthPayload,
    AuthDto,
    FindAllUsersQuery,
    FindAllUsersDto,
    ConfirmChangePasswordPayload,
    User,
    CreateUserPayload,
} from '@talent-hub/shared';
import { FileInput } from './file-input';

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
