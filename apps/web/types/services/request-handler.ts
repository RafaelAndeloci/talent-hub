export type ApiMethods = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
export type ApiResponse<TResult, TError> =
  | {
      statusCode: number;
      success: true;
      result?: TResult;
    }
  | { statusCode: number; success: false; error: TError };

export type DefaultErr = {
  message: string;
};
