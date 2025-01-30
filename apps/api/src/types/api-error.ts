import { ZodError } from 'zod';

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

    /**
     * @param message message for bad request
     * @throws {ApiError}
     */
    static throwBadRequest(message: string) {
        throw new ApiError(400, [message], 'Bad Request');
    }

    /**
     * @param message message for unauthorized
     * @throws {ApiError}
     */
    static throwUnauthorized(message: string) {
        throw new ApiError(401, [message], 'Unauthorized');
    }

    /**
     * @param message message for forbidden
     * @throws {ApiError}
     */
    static throwForbidden(message: string) {
        throw new ApiError(403, [message], 'Forbidden');
    }

    /**
     * @param message message for resource not found
     * @throws {ApiError}
     */
    static throwNotFound(message: string) {
        throw new ApiError(404, [message], 'Not Found');
    }

    /**
     * @param message cause of conflict
     * @throws {ApiError}
     */
    static throwConflict(message: string) {
        throw new ApiError(409, [message], 'Conflict');
    }

    /**
     * @param message cause of unprocessable entity
     * @throws {ApiError}
     */
    static throwUnprocessableEntity(message: string) {
        throw new ApiError(422, [message], 'Unprocessable Entity');
    }

    /**
     * @param message
     * @throws {ApiError}
     */
    static throwInternalServerError(message: string) {
        throw new ApiError(500, [message], 'Internal Server Error');
    }

    /**
     * @param error
     * @returns {ApiError}
     */
    static fromError(error: Error): ApiError {
        return new ApiError(500, [error.message], 'Internal Server Error');
    }

    /**
     * @param error
     * @returns {ApiError}
     */
    static fromZodError(error: ZodError): ApiError {
        return new ApiError(
            400,
            error.errors.map(error => error.message),
            'Bad Request',
        );
    }

    /**
     * throws a ApiError with expose=false flag
     * @param message error message
     * @throws {ApiError}
     */
    static throwWithoutExpose(message: string) {
        const error = new ApiError(500, [message], 'Internal Server Error', false);
        throw error;
    }

    /**
     *
     * @returns { { code: number; status: string; errors: string[]}}
     */
    public toJson(): { code: number; status: string; errors: string[] } {
        return {
            code: this.code,
            status: this.status,
            errors: this.errors,
        };
    }
}
