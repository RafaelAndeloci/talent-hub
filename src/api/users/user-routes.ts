import { Router } from 'express';
import userController from './user-controller';
import authenticate from '../../middlewares/auth-middleware';
import userSchema from './user-schema';
import validate from '../../middlewares/validation-middleware';
import upload, { singleFileUpload } from '../../middlewares/file-upload-middleware';

const userRouter = Router();

userRouter.post('/', validate(userSchema.create), userController.create as any);
userRouter.post(
  '/:id/auth',
  validate(userSchema.auth),
  userController.auth as any,
);
userRouter.get(
  '/:id',
  authenticate,
  validate(userSchema.findById),
  userController.findById,
);
userRouter.get(
  '/',
  authenticate,
  validate(userSchema.findAll),
  userController.findAll as any,
);
userRouter.put(
  '/current/profile-picture',
  authenticate,
  singleFileUpload,
  validate(userSchema.updateProfilePicture),
  userController.updateProfilePicture as any,
);

export default userRouter;
