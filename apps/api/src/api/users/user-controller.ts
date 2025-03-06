import HTTPStatus from 'http-status';
import UserBusiness from './user-business';
import { RequestHandler } from 'express';
import {
    User,
    AuthResult,
    AuthPayload,
    ConfirmEmailPayload,
    ConfirmPasswordChangePayload,
    CreateUserPayload,
    SendChangePasswordTokenPayload,
    PagedResponse,
    QueryArgs,
    UserDto,
} from '@talent-hub/shared';

export default class UserController {
    constructor(private userBusiness: UserBusiness = new UserBusiness()) {}

    findById: RequestHandler<{ id: string }, UserDto, void, void, UserDto> = async (req, res) => {
        const { id } = req.params;
        const user = await this.userBusiness.findById({ userId: id });
        res.json(user);
    };

    findAll: RequestHandler<void, PagedResponse<UserDto>, void, QueryArgs<User>, UserDto> = async (
        req,
        res,
    ) => {
        const users = await this.userBusiness.findAll({ query: req.query });
        res.json(users);
    };

    create: RequestHandler<void, UserDto, CreateUserPayload, void, UserDto> = async (req, res) => {
        const user = await this.userBusiness.create({ payload: req.body });
        res.status(HTTPStatus.CREATED).json(user);
    };

    auth: RequestHandler<void, AuthResult, AuthPayload, void, {}> = async (req, res) => {
        const { identifier, password } = req.body;
        const token = await this.userBusiness.auth({ payload: { identifier, password } });
        res.json(token);
    };

    updateProfilePicture: RequestHandler<{ id: string }, UserDto, void, void> = async (
        req,
        res,
    ) => {
        const { id } = req.params;
        const { buffer, mimetype } = req.file!;
        const user = await this.userBusiness.updateProfilePicture({
            userId: id,
            file: { content: buffer, mimetype },
        });
        res.json(user);
    };

    remove: RequestHandler<{ id: string }, void, void, void> = async (req, res) => {
        const { id } = req.params;
        await this.userBusiness.remove({ userId: id });
        res.status(HTTPStatus.NO_CONTENT).end();
    };

    sendChangePasswordToken: RequestHandler<void, void, SendChangePasswordTokenPayload, void> =
        async (req, res) => {
            await this.userBusiness.sendChangePasswordToken(req.body);
            res.status(HTTPStatus.OK).end();
        };

    confirmChangePassword: RequestHandler<
        { id: string },
        void,
        ConfirmPasswordChangePayload,
        void
    > = async (req, res) => {
        const { id } = req.params;
        await this.userBusiness.confirmChangePassword({ userId: id, payload: req.body });
        res.status(HTTPStatus.OK).end();
    };

    confirmEmail: RequestHandler<{ id: string }, void, ConfirmEmailPayload, void> = async (
        req,
        res,
    ) => {
        const { id } = req.params;
        await this.userBusiness.confirmEmail({ userId: id, token: req.body.token });
        res.status(HTTPStatus.OK).end();
    };
}
