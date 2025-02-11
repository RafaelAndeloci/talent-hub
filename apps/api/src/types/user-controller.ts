import {
    Id,
    UserDto,
    AuthContext,
    FindAllUsersDto,
    FindAllUsersQuery,
    CreateUserPayload,
    AuthDto,
    AuthPayload,
    SendChangePasswordPayload,
    ConfirmChangePasswordPayload,
    ConfirmUserEmailPayload,
} from '@talent-hub/shared/types';
import { RequestHandler } from 'express';

export type UserController = {
    findById: RequestHandler<Id, UserDto, void, void, AuthContext>;

    findAll: RequestHandler<void, FindAllUsersDto, void, FindAllUsersQuery, AuthContext>;

    create: RequestHandler<void, UserDto, CreateUserPayload, void>;

    auth: RequestHandler<void, AuthDto, AuthPayload, void>;

    updateProfilePicture: RequestHandler<Id, UserDto, void, void, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    sendChangePasswordToken: RequestHandler<void, void, SendChangePasswordPayload, void, any>;

    confirmChangePassword: RequestHandler<Id, void, ConfirmChangePasswordPayload>;

    confirmEmail: RequestHandler<Id, void, ConfirmUserEmailPayload, void, any>;
};
