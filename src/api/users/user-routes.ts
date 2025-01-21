import { Router } from 'express';
import userController from './user-controller';
import authenticate from '../../middlewares/auth-middleware';
import userSchema from './user-schema';
import validate from '../../middlewares/validation-middleware';

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
  '/:id/profile-picture',
  authenticate,
  validate(userSchema.updateProfilePicture),
  userController.updateProfilePicture as any,
);

export default userRouter;
