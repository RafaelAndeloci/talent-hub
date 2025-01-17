import ApiError from '../../shared/errors/api-error';
import CreateUserProps from './types/create-user-props';
import userRepository from './user-repository';
import hasher from '../../shared/services/hasher';
import UserProps from './types/user-props';
import * as uuid from 'uuid';
import storageService from '../../shared/services/file-storage-service';
import jwtService from '../../shared/services/jwt-service';
import AuthProps from './types/auth-props';

const parser = (user: UserProps): any => {
  const { hashedPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const userBusiness = {
  create: async (payload: CreateUserProps) => {
    const {
      records: [existingUser],
    } = await userRepository.findAll({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      ApiError.throwBadRequest('E-mail ou senha inválidos.');
    }

    const hashedPassword = await hasher.hash(payload.password);

    const user: UserProps = {
      id: uuid.v4(),
      hashedPassword,
      email: payload.email,
      role: payload.role,
      profilePictureUrl: null,
    };

    await userRepository.create(user);

    return parser(user);
  },

  updateProfilePicture: async ({
    userId,
    fileStream,
    contentType,
  }: {
    userId: string;
    fileStream: NodeJS.ReadableStream;
    contentType: 'image/jpeg' | 'image/png';
  }) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      ApiError.throwNotFound('Usuário não encontrado.');
    }

    const fileName = `${userId}.${contentType.split('/')[1]}`;

    await storageService.upload({
      fileStream,
      fileName,
      contentType,
    });

    user.profilePictureUrl = fileName;

    await userRepository.update(user);

    return parser(user);
  },

  auth: async ({ email, password }: AuthProps) => {
    const hashedPassword = await hasher.hash(password);

    const {
      records: [user],
    } = await userRepository.findAll({
      where: {
        email,
        hashedPassword,
      },
    });

    if (!user) {
      ApiError.throwUnauthorized('E-mail ou senha inválidos.');
    }

    return jwtService.generateToken(user);
  },
};

export default userBusiness;
