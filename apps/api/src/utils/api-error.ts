export default class ApiError extends Error {
    private status: number;

    private constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    static throwBadRequest(message: string): never {
        throw new ApiError(message, 400);
    }

    static throwNotFound(message: string): never {
        throw new ApiError(message, 404);
    }

    static throwConflict(message: string): never {
        throw new ApiError(message, 409);
    }

    static throwUnprocessableEntity(message: string): never {
        throw new ApiError(message, 422);
    }

    static throwForbidden(message: string): never {
        throw new ApiError(message, 403);
    }

    static throwUnauthorized(message: string): never {
        throw new ApiError(message, 401);
    }

    static throwInternalServerError(message: string): never {
        throw new ApiError(message, 500);
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status,
        };
    }
}
