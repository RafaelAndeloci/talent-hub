import userBusiness from './user-business';
import UserController from './types/user-controller';
import UpdateUserProfilePictureProps from './types/update-user-profile-picture-props';
import ApiError from '../../types/api-error';
import config from '../../config/environment';

const { allowedMimeTypes } = config;

const userController: UserController = {
  async findById(req, res) {
    const id = req.params.id;
    const user = await userBusiness.findById(id);
    res.status(200).json(user);
  },

  async findAll({ query }, res) {
    const users = await userBusiness.findAll(query);
    res.status(200).json(users);
  },

  async create(req, res) {
    const user = await userBusiness.create(req.body);
    res.status(201).json(user);
  },

  async updateProfilePicture({ file, params: { id: userId } }, res) {
    if (!file) {
      ApiError.throwBadRequest('File is required');
    }
    const { stream, mimetype } = file!;

    if (allowedMimeTypes.images.indexOf(mimetype) === -1) {
      ApiError.throwBadRequest(
        `O tipo da imagem não é permitido. Tipos permitidos: ${allowedMimeTypes.images.join(', ')}`,
      );
    }

    const updateProps: UpdateUserProfilePictureProps = {
      fileStream: stream,
      userId,
      contentType: mimetype as any,
    };
    await userBusiness.updateProfilePicture(updateProps);

    res.status(204).send();
  },

  async auth({ body }, res) {
    const token = await userBusiness.auth(body);
    res.status(200).json(token);
  },
};

export default userController;
