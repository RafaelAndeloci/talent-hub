import HTTPStatus from 'http-status';

export class ApiError extends Error {
    public readonly expose: boolean = true;
    public code: number;
    public errors: string[];
    public status: string;

    constructor(code: number, errors: string[] = [], status: string, expose = true) {
        super(status);
        this.code = code;
        this.errors = errors;
        this.status = status;
        this.expose = expose;
    }

    static throwBadRequest(message: string) {
        throw new ApiError(HTTPStatus.BAD_REQUEST, [message], HTTPStatus['400_NAME']);
    }

    static throwUnauthorized(message: string) {
        throw new ApiError(HTTPStatus.UNAUTHORIZED, [message], HTTPStatus['401_NAME']);
    }

    static throwForbidden(message: string) {
        throw new ApiError(HTTPStatus.FORBIDDEN, [message], HTTPStatus['403_NAME']);
    }

    static throwNotFound(message: string) {
        throw new ApiError(HTTPStatus.NOT_FOUND, [message], HTTPStatus['404_NAME']);
    }

    static throwConflict(message: string) {
        throw new ApiError(HTTPStatus.CONFLICT, [message], HTTPStatus['409_NAME']);
    }

    static throwUnprocessableEntity(message: string) {
        throw new ApiError(HTTPStatus.UNPROCESSABLE_ENTITY, [message], HTTPStatus['422_NAME']);
    }

    static throwInternalServerError(message: string) {
        throw new ApiError(HTTPStatus.INTERNAL_SERVER_ERROR, [message], HTTPStatus['500_NAME']);
    }

    static fromError(error: Error): ApiError {
        return new ApiError(
            HTTPStatus.INTERNAL_SERVER_ERROR,
            [error.message],
            HTTPStatus['500_NAME'],
        );
    }

    static throwWithoutExpose(message: string) {
        const error = new ApiError(500, [message], 'Internal Server Error', false);
        throw error;
    }

    public toJson(): { code: number; status: string; errors: string[] } {
        return {
            code: this.code,
            status: this.status,
            errors: this.errors,
        };
    }
}
