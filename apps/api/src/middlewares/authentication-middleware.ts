/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../utils/api-error';
import JwtService from '../services/jwt-service';
import { Handler } from '../types/handler';

export const authenticate: Handler<any, any, any, any> = (req, res, next) => {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (!token || type !== 'Bearer') {
        ApiError.throwUnauthorized('missing authorization token');
    }

    const user = JwtService.authenticateToken(token);
    if (!user) {
        ApiError.throwUnauthorized('invalid authorization token');
    }

    res.locals.user = user;
    return next();
};
