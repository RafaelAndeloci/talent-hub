import HTTPStatus from 'http-status';
import { ZodError } from 'zod';
import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Logger } from '../services/logging-service';
import ApiError from '../utils/api-error';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
    if (err instanceof ApiError && err.expose) {
        res.status(err.status).json(err.toJSON());
        return;
    }

    if (err instanceof TokenExpiredError) {
        res.status(HTTPStatus.UNAUTHORIZED).json({
            status: HTTPStatus['401_NAME'],
            code: HTTPStatus.UNAUTHORIZED,
            errors: ['token expired'],
        });
        return;
    }

    if (err instanceof ZodError) {
        res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus['400_NAME'],
            code: HTTPStatus.BAD_REQUEST,
            errors: err.issues.map((issue) => ({
                code: issue.code,
                message: issue.message,
                path: issue.path.join('.'),
            })),
        });
        return;
    }

    if (err instanceof SyntaxError) {
        res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus['400_NAME'],
            code: HTTPStatus.BAD_REQUEST,
            errors: ['invalid json'],
        });
        return;
    }

    if (err instanceof JsonWebTokenError) {
        res.status(HTTPStatus.UNAUTHORIZED).json({
            status: HTTPStatus['401_NAME'],
            code: HTTPStatus.UNAUTHORIZED,
            errors: ['invalid token'],
        });
        return;
    }

    Logger.error('Unhandled error:', err);

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        status: HTTPStatus['500_NAME'],
        code: HTTPStatus.INTERNAL_SERVER_ERROR,
        errors: ['unexpected error'],
    });

    next();
};
