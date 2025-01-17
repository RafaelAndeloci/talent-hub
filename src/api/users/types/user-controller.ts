import { Request, Response } from 'express';
import UserDtoProps from './user-dto-props';
import { User } from '@prisma/client';
import PagedList from '../../../types/paged-list';
import AuthProps from './auth-props';
import FindUsersProps from './find-users-props';
import CreateUserProps from './create-user-props';
import AuthTokenProps from './auth-token-props';

type UserController = {
  findById: (
    req: Request<Pick<User, 'id'>>,
    res: Response<UserDtoProps>,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindUsersProps>,
    res: Response<PagedList<UserDtoProps>>,
  ) => Promise<void>;

  create: (
    req: Request<void, void, CreateUserProps>,
    res: Response<UserDtoProps>,
  ) => Promise<void>;

  updateProfilePicture: (
    req: Request<
      Pick<User, 'id'>,
      void,
      void,
      void,
      { file: Express.Multer.File }
    >,
    res: Response<UserDtoProps>,
  ) => Promise<void>;

  auth: (
    req: Request<void, void, AuthProps>,
    res: Response<AuthTokenProps>,
  ) => Promise<void>;
};

export default UserController;
