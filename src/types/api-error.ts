import { ZodError } from 'zod';

export default class ApiError extends Error {
  public readonly expose: boolean = true;
  public code: number;
  public errors: string[];
  public status: string;

  constructor(
    code: number,
    errors: string[] = [],
    status: string,
    expose = true,
  ) {
    super(status);
    this.code = code;
    this.errors = errors;
    this.status = status;
    this.expose = expose;
  }

  static throwBadRequest(message: string) {
    throw new ApiError(400, [message], 'Bad Request');
  }

  static throwUnauthorized(message: string) {
    throw new ApiError(401, [message], 'Unauthorized');
  }

  static throwForbidden(message: string) {
    throw new ApiError(403, [message], 'Forbidden');
  }

  static throwNotFound(message: string) {
    throw new ApiError(404, [message], 'Not Found');
  }

  static throwConflict(message: string) {
    throw new ApiError(409, [message], 'Conflict');
  }

  static throwUnprocessableEntity(message: string) {
    throw new ApiError(422, [message], 'Unprocessable Entity');
  }

  static throwInternalServerError(message: string) {
    throw new ApiError(500, [message], 'Internal Server Error');
  }

  static fromError(error: Error) {
    return new ApiError(500, [error.message], 'Internal Server Error');
  }

  static fromZodError(error: ZodError) {
    return new ApiError(
      400,
      error.errors.map(error => error.message),
      'Bad Request',
    );
  }

  static throwWithoutExpose(message: string) {
    const error = new ApiError(500, [message], 'Internal Server Error', false);
    throw error;
  }

  public toJson() {
    return {
      code: this.code,
      status: this.status,
      errors: this.errors,
    };
  }
}
