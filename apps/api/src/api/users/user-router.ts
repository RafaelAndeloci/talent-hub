/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

import { Router } from 'express';
import { validate } from '../../middlewares/validation-middleware';
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
import { authorize } from '../../middlewares/authorization-middleware';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import { singleFileUpload } from '../../middlewares/file-upload-middleware';
import { authenticate } from '../../middlewares/authentication-middleware';

export const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserSchema'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/', validate(CreateUserSchema), userController.create);

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSchema'
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 */
userRouter.post('/auth', validate(AuthSchema), userController.auth);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 */
userRouter.get(
    '/:id',
    authenticate,
    authorize({ resource: Resource.users, action: Action.readById }),
    validate(FindUserByIdSchema),
    userController.findById as any,
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
userRouter.get(
    '/',
    authenticate,
    authorize({ resource: Resource.users, action: Action.readAll }),
    validate(FindAllUsersSchema),
    userController.findAll as any,
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete(
    '/:id',
    authenticate,
    authorize({ resource: Resource.users, action: Action.delete }),
    validate(RemoveUserSchema),
    userController.remove as any,
);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Send reset password token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendResetPasswordTokenSchema'
 *     responses:
 *       200:
 *         description: Reset password token sent
 */
userRouter.post(
    '/change-password',
    authenticate,
    authorize({ resource: Resource.users, action: Action.sendUserChangePasswordToken }),
    validate(SendPasswordChangeTokenSchema),
    userController.sendChangePasswordToken as any,
);

userRouter.post(
    '/change-password/confirm',
    authenticate,
    authorize({ resource: Resource.users, action: Action.confirmUserChangePassword }),
    validate(SendPasswordChangeTokenSchema),
    userController.confirmChangePassword as any,
);

/**
 * @swagger
 * /api/users/{id}/profile-picture:
 *   put:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfilePictureSchema'
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 */
userRouter.put(
    '/:id/profile-picture',
    authenticate,
    authorize({
        resource: Resource.users,
        action: Action.updateUserProfilePicture,
    }),
    singleFileUpload,
    validate(UpdateUserProfilePictureSchema),
    userController.updateProfilePicture as any,
);
