import { NextFunction, Request, Response } from 'express';
import PagedList from '../../../types/paged-list';
import AuthProps from './auth-props';
import FindUsersProps from './find-users-props';
import CreateUserProps from './create-user-props';
import AuthTokenProps from './auth-token-props';
import User from './user';

type UserController = {
  findById: (
    req: Request<Pick<User, 'id'>>,
    res: Response<User>,
    next: NextFunction,
  ) => Promise<void>;

  findAll: (
    req: Request<void, void, void, FindUsersProps>,
    res: Response<PagedList<User>>,
    next: NextFunction,
  ) => Promise<void>;

  create: (
    req: Request<void, void, CreateUserProps>,
    res: Response<User>,
    next: NextFunction,
  ) => Promise<void>;

  updateProfilePicture: (
    req: Request<void, void, void, void, { file: Express.Multer.File }>,
    res: Response<User>,
    next: NextFunction,
  ) => Promise<void>;

  auth: (
    req: Request<void, void, AuthProps>,
    res: Response<AuthTokenProps>,
    next: NextFunction,
  ) => Promise<void>;
};

export default UserController;
