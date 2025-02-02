import { RequestHandler } from 'express';
import { CreateUserPayload } from './create-user-payload';
import { UserDto } from './user-dto';
import { FindAllUsersDto } from './find-all-users-dto';
import { FindAllUsersQuery } from './find-all-users-query';
import { AuthContext } from './auth-context';
import { AuthDto } from './auth-dto';
import { AuthPayload } from './auth-payload';
import { Id } from '../../../types/id';
import { SendChangePasswordPayload } from './send-change-password-payload';
import { ConfirmChangePasswordPayload } from './confirm-reset-password-payload';
import { ConfirmUserEmailPayload } from './confirm-user-email-payload';

export type UserController = {
    findById: RequestHandler<Id, UserDto, void, void, AuthContext>;

    findAll: RequestHandler<void, FindAllUsersDto, void, FindAllUsersQuery, AuthContext>;

    create: RequestHandler<void, UserDto, CreateUserPayload, void>;

    auth: RequestHandler<void, AuthDto, AuthPayload, void>;

    updateProfilePicture: RequestHandler<Id, UserDto, void, void, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    sendChangePasswordToken: RequestHandler<
        void,
        void,
        SendChangePasswordPayload,
        void,
        any
    >;

    confirmChangePassword: RequestHandler<Id, void, ConfirmChangePasswordPayload>;

    confirmEmail: RequestHandler<Id, void, ConfirmUserEmailPayload, void, any>;
};
