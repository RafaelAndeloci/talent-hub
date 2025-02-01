import { userController } from './user-controller';
import {
    AuthSchema,
    CreateUserSchema,
    FindAllUsersSchema,
    FindUserByIdSchema,
    RemoveUserSchema,
    SendPasswordChangeTokenSchema,
    UpdateProfilePictureSchema as UpdateUserProfilePictureSchema,
} from './user-schema';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { ApiResource } from '../../types/api-resource';

export const userRoutes: ApiResource = {
    resource: Resource.users,
    routes: [
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindUserByIdSchema,
            action: Action.readById,
            handler: userController.findById,
        },
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllUsersSchema,
            action: Action.readAll,
            handler: userController.findAll,
        },
        {
            method: 'post',
            path: '/',
            schema: CreateUserSchema,
            action: Action.create,
            handler: userController.create,
        },
        {
            method: 'post',
            path: '/auth',
            schema: AuthSchema,
            action: Action.userAuthentication,
            handler: userController.auth,
        },

        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: RemoveUserSchema,
            action: Action.delete,
            handler: userController.remove,
        },
        {
            method: 'post',
            path: '/change-password',
            auth: true,
            schema: SendPasswordChangeTokenSchema,
            action: Action.sendUserChangePasswordToken,
            handler: userController.sendChangePasswordToken,
        },
        {
            method: 'post',
            path: '/change-password/confirm',
            auth: true,
            schema: SendPasswordChangeTokenSchema,
            action: Action.confirmUserChangePassword,
            handler: userController.confirmChangePassword,
        },
        {
            method: 'put',
            path: '/:id/profile-picture',
            auth: true,
            schema: UpdateUserProfilePictureSchema,
            action: Action.updateUserProfilePicture,
            handler: userController.updateProfilePicture,
            middlewares: [singleFileUpload],
        },
    ],
};
