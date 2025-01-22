import userBusiness from './user-business';
import UserController from './types/user-controller';
import UpdateUserProfilePictureProps from './types/update-user-profile-picture-props';
import ApiError from '../../types/api-error';
import config from '../../config/environment';
import HTTPStatus from 'http-status';

const { allowedMimeTypes } = config;

const userController: UserController = {
  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userBusiness.findById(id);
      res.status(HTTPStatus.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  async findAll({ query }, res, next) {
    try {
      const users = await userBusiness.findAll(query);
      res.status(HTTPStatus.OK).json(users);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const user = await userBusiness.create(req.body);
      res.status(HTTPStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfilePicture({ file }, res, next) {
    try {
      const user = res.locals.user;

      const { buffer, mimetype } = file || {};
      if (!buffer || !mimetype) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus['400_NAME'],
          code: HTTPStatus.BAD_REQUEST,
          message: 'File is required',
        } as any);

        return;
      }

      if (allowedMimeTypes.images.indexOf(mimetype) === -1) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus['400_NAME'],
          code: HTTPStatus.BAD_REQUEST,
          message: `The image type is not allowed. Allowed types: ${allowedMimeTypes.images.join(', ')}`,
        } as any);
        return;
      }

      const updated = await userBusiness.updateProfilePicture({
        file: buffer,
        userId: user.id,
        contentType: mimetype as any,
      });

      res.status(HTTPStatus.OK).json(updated);
    } catch (error) {
      next(error);
    }
  },

  async auth({ body }, res, next) {
    try {
      const token = await userBusiness.auth(body);
      res.status(HTTPStatus.OK).json(token);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
