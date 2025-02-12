import { userController } from './user-controller';
import {
    AuthSchema,
    ConfirmEmailSchema,
    ConfirmPasswordChangeSchema,
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
    resource: Resource.Users,
    routes: [
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: FindUserByIdSchema,
            action: Action.ReadById,
            handler: userController.findById,
        },
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: FindAllUsersSchema,
            action: Action.ReadAll,
            handler: userController.findAll,
        },
        {
            method: 'post',
            path: '/',
            schema: CreateUserSchema,
            action: Action.Create,
            handler: userController.create,
        },
        {
            method: 'post',
            path: '/auth',
            schema: AuthSchema,
            action: Action.UserAuth,
            handler: userController.auth,
        },

        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: RemoveUserSchema,
            action: Action.Delete,
            handler: userController.remove,
        },
        {
            method: 'post',
            path: '/change-password',
            schema: SendPasswordChangeTokenSchema,
            action: Action.UserRequestChangePasswordToken,
            handler: userController.sendChangePasswordToken,
        },
        {
            method: 'post',
            path: '/:id/confirm-email',
            schema: ConfirmEmailSchema,
            action: Action.UserConfirmEmail,
            handler: userController.confirmEmail,
        },
        {
            method: 'post',
            path: '/:id/change-password/confirm',
            schema: ConfirmPasswordChangeSchema,
            action: Action.userChangePassword,
            handler: userController.confirmChangePassword,
        },
        {
            method: 'put',
            path: '/:id/profile-picture',
            auth: true,
            schema: UpdateUserProfilePictureSchema,
            action: Action.UserSetProfilePicture,
            handler: userController.updateProfilePicture,
            middlewares: [singleFileUpload],
        },
    ],
};
