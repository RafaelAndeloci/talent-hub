import { ApiResponse } from "@/types/service/api";
import { RequestProps } from "@/types/service/request";

export async function requestHandler<TRes>({
  endpoint,
  method,
  data,
  query,
}: RequestProps): Promise<ApiResponse<TRes>> {
  try {
    const apiUrl = `${process.env.API_URL}${endpoint}${query}`;

    const res = await fetch(apiUrl, { body: data, method });

    if (!res.ok) {
      const body = res.text();
      return {
        success: res.ok,
        statusCode: 400,
        error: {
          message: JSON.stringify(body),
        },
      };
    }

    const response = (await res.json()) as TRes;

    return {
      statusCode: 200,
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      error: {
        message: "Erro interno. Tente novamente mais tarde.",
      },
    };
  }
}
