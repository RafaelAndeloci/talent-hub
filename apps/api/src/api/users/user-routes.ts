import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { UserApiSchema } from '@talent-hub/shared';
import UserController from './user-controller';

const userController = new UserController();

export const userRoutes = {
    resource: Resource.Users,
    routes: [
        {
            method: 'get',
            path: '/:id',
            auth: true,
            schema: UserApiSchema.FindById,
            action: Action.ReadById,
            handler: userController.findById,
        },
        {
            method: 'get',
            path: '/',
            auth: true,
            schema: UserApiSchema.FindAll,
            action: Action.ReadAll,
            handler: userController.findAll,
        },
        {
            method: 'post',
            path: '/',
            schema: UserApiSchema.Create,
            action: Action.Create,
            handler: userController.create,
        },
        {
            method: 'post',
            path: '/auth',
            schema: UserApiSchema.Auth,
            action: Action.UserAuth,
            handler: userController.auth,
        },

        {
            method: 'delete',
            path: '/:id',
            auth: true,
            schema: UserApiSchema.Remove,
            action: Action.Delete,
            handler: userController.remove,
        },
        {
            method: 'post',
            path: '/change-password',
            schema: UserApiSchema.SendChangePasswordToken,
            action: Action.UserRequestChangePasswordToken,
            handler: userController.sendChangePasswordToken,
        },
        {
            method: 'post',
            path: '/:id/confirm-email',
            schema: UserApiSchema.ConfirmEmail,
            action: Action.UserConfirmEmail,
            handler: userController.confirmEmail,
        },
        {
            method: 'post',
            path: '/:id/change-password/confirm',
            schema: UserApiSchema.ConfirmChangePassword,
            action: Action.userChangePassword,
            handler: userController.confirmChangePassword,
        },
        {
            method: 'put',
            path: '/:id/profile-picture',
            auth: true,
            schema: UserApiSchema.SetProfilePicture,
            action: Action.UserSetProfilePicture,
            handler: userController.updateProfilePicture,
            middlewares: [singleFileUpload],
        },
    ],
};
