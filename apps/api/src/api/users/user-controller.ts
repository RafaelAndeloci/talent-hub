import HTTPStatus from 'http-status';
import { userBusiness } from './user-business';
import { UserController } from './types/user-controller';

export const userController: UserController = {
    findById: async ({ params: { id: userId } }, res) => {
        const userDto = await userBusiness.findById({ userId });
        res.status(HTTPStatus.OK).json(userDto);
    },

    findAll: async ({ query }, res) => {
        const usersDto = await userBusiness.findAll({ query });
        res.status(HTTPStatus.OK).json(usersDto);
    },

    create: async ({ body }, res) => {
        const userDto = await userBusiness.create({ payload: body });
        res.status(HTTPStatus.CREATED).json(userDto);
    },

    auth: async ({ body }, res) => {
        const authDto = await userBusiness.auth({ payload: body });
        res.status(HTTPStatus.OK).json(authDto);
    },

    updateProfilePicture: async (
        { params: { id: userId }, file: { buffer, mimetype } = {} },
        res,
    ) => {
        const userDto = await userBusiness.updateProfilePicture({
            userId,
            file: { content: buffer!, mimetype: mimetype! },
        });
        res.status(HTTPStatus.OK).json(userDto);
    },

    remove: async ({ params: { id: userId } }, res) => {
        await userBusiness.remove({ userId });
        res.status(HTTPStatus.NO_CONTENT).end();
    },

    sendChangePasswordToken: async ({ body }, res) => {
        await userBusiness.sendChangePasswordToken(body);
        res.status(HTTPStatus.OK).end();
    },

    confirmChangePassword: async ({ body: payload, params: { id: userId } }, res) => {
        await userBusiness.confirmChangePassword({ userId, payload });
        res.status(HTTPStatus.OK).end();
    },
};
