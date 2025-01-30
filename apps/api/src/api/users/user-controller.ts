import HTTPStatus from 'http-status';
import { userBusiness } from './user-business';
import { UserController } from './types/user-controller';

export const userController: UserController = {
    findById: async (req, res, next) => {
        try {
            const userId = req.params.id;

            const userDto = await userBusiness.findById({ userId });

            res.status(HTTPStatus.OK).json(userDto);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const { query } = req;

            const usersDto = await userBusiness.findAll({ query });

            res.status(HTTPStatus.OK).json(usersDto);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const payload = req.body;

            const userDto = await userBusiness.create({ payload });

            res.status(HTTPStatus.CREATED).json(userDto);
        } catch (error) {
            next(error);
        }
    },

    auth: async (req, res, next) => {
        try {
            const payload = req.body;

            const authDto = await userBusiness.auth({ payload });

            res.status(HTTPStatus.OK).json(authDto);
        } catch (error) {
            next(error);
        }
    },

    updateProfilePicture: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const { buffer, mimetype } = req.file!;

            const userDto = await userBusiness.updateProfilePicture({
                userId,
                file: { content: buffer, mimetype },
            });

            res.status(HTTPStatus.OK).json(userDto);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            const userId = req.params.id;

            await userBusiness.remove({ userId });

            res.status(HTTPStatus.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    },

    sendChangePasswordToken: async (req, res, next) => {
        try {
            const { identifier } = req.body;

            await userBusiness.sendChangePasswordToken({ identifier });

            res.status(HTTPStatus.OK).end();
        } catch (error) {
            next(error);
        }
    },

    confirmChangePassword: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const payload = req.body;

            await userBusiness.confirmChangePassword({ userId, payload });

            res.status(HTTPStatus.OK).end();
        } catch (error) {
            next(error);
        }
    },
};
