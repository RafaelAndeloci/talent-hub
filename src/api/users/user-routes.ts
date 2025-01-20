import { Router } from 'express';
import userController from './user-controller';
import errorHandlerWrapper from '../../middlewares/error-handler-middle';
import authenticate from '../../middlewares/auth-middleware';
import userSchema from './user-schema';
import validate from '../../middlewares/validation-middleware';

const userRouter = Router();

userRouter.post(
  '/',
  validate(userSchema.create),
  errorHandlerWrapper(userController.create),
);
userRouter.post(
  '/:id/auth',
  validate(userSchema.auth),
  errorHandlerWrapper(userController.auth),
);
userRouter.get(
  '/:id',
  authenticate,
  validate(userSchema.findById),
  errorHandlerWrapper(userController.findById),
);
userRouter.get(
  '/',
  authenticate,
  validate(userSchema.findAll),
  errorHandlerWrapper(userController.findAll),
);
userRouter.put(
  '/:id/profile-picture',
  authenticate,
  validate(userSchema.updateProfilePicture),
  errorHandlerWrapper(userController.updateProfilePicture),
);

export default userRouter;
