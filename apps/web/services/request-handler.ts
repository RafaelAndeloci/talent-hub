import {
  ApiMethods,
  ApiResponse,
  DefaultErr,
} from "@/types/services/request-handler";
import { logError } from "@/utils/log-error";

export async function requestHandler<T, R extends DefaultErr>(
  method: ApiMethods,
  route: string,
  payload?: any,
): Promise<ApiResponse<T, R>> {
  try {
    const apiUrl = `${process.env.API_URL}/${route}`;

    const response = await fetch(apiUrl, { method, body: payload });

    const res = await response.json();

    if (!res.success) {
      return {
        success: false,
        statusCode: res.statusCode,
        error: res.error,
      };
    } else {
      return res;
    }
  } catch (err) {
    logError(err);
    if (err instanceof Error) {
      return {
        success: false,
        statusCode: 500,
        error: { message: err.message } as R,
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        error: { message: "Erro interno. Tente novamente mais tarde." } as R,
      };
    }
  }
}
