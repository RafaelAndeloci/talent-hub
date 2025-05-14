export type ApiResponse<TRes> =
  | {
      statusCode: 200;
      data?: TRes;
      success: true;
    }
  | {
      statusCode: 400 | 404;
      data?: TRes;
      success: false;
      error: {
        message: string;
        code?: number;
      };
    }
  | {
      statusCode: 500;
      data?: TRes;
      success: false;
      error: {
        message: string;
        code?: number;
      };
    };
