export default class ApiError extends Error {
    public expose: boolean = false;
    public status: number;

    private constructor(message: string, status: number, expose: boolean = true) {
        super(message);
        this.status = status;
        this.expose = expose;
    }

    public static throwBadRequest(message: string): never {
        throw new ApiError(message, 400);
    }

    public static throwNotFound(message: string): never {
        throw new ApiError(message, 404);
    }

    public static throwConflict(message: string): never {
        throw new ApiError(message, 409);
    }

    public static throwUnprocessableEntity(message: string): never {
        throw new ApiError(message, 422);
    }

    public static throwForbidden(message: string): never {
        throw new ApiError(message, 403);
    }

    public static throwUnauthorized(message: string): never {
        throw new ApiError(message, 401);
    }

    public static throwInternalServerError(message: string): never {
        throw new ApiError(message, 500);
    }

    public static throwWithoutExpose(message: string): never {
        throw new ApiError(message, 500, false);
    }

    public toJSON() {
        return this.expose
            ? { message: this.message, status: this.status }
            : { message: 'Internal Server Error', status: 500 };
    }
}
