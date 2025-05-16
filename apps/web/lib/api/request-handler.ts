import { ApiRequestOptions, ApiResponse, ErrorCode } from '@/types/service/api'
import { ApiMethods } from '@/types/service/methods'
import { z } from 'zod'

export const createErrorResponse = <T>(
  code: string,
  message: string,
  details?: unknown
): ApiResponse<T> => ({
  success: false,
  data: null,
  error: { code, message, details },
  timestamp: new Date().toISOString(),
})

export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  error: null,
  success: true,
  timestamp: new Date().toISOString(),
})

export class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  /**
   *
   */
  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  private async request<T, R = unknown>(
    method: ApiMethods,
    endpoint: string,
    schema?: z.ZodType<T>,
    body?: R,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...(options.headers || {}),
        },
        cache: options.cache,
        next: options.next,
      })

      const contentType = response.headers.get('content-type')
      let responseData: any

      if (contentType?.includes('application/json')) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      const isApiResponse =
        responseData &&
        typeof responseData === 'object' &&
        'success' in responseData &&
        'data' in responseData &&
        'error' in responseData

      if (isApiResponse) {
        return responseData as ApiResponse<T>
      }

      if (!response.ok) {
        return createErrorResponse(
          `HTTP_${response.status}`,
          response.statusText || 'Erro na requisição',
          responseData
        )
      }

      if (schema) {
        try {
          const validatedData = schema.parse(responseData)
          return createSuccessResponse(validatedData)
        } catch (validationError) {
          return createErrorResponse(
            ErrorCode.VALIDATION_ERROR,
            'Erro de validação dos dados',
            validationError
          )
        }
      }
      return createSuccessResponse(responseData)
    } catch (error) {
      if (error instanceof Error) {
        return createErrorResponse(ErrorCode.NETWORK_ERROR, error.message, {
          name: error.name,
          stack: error.stack,
        })
      }

      return createErrorResponse(
        ErrorCode.INTERNAL_ERROR,
        'Erro desconhecido',
        error
      )
    }
  }

  async get<T>(
    endpoint: string,
    schema?: z.ZodType<T>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, schema, undefined, options)
  }

  async post<T, R = unknown>(
    endpoint: string,
    body: R,
    schema?: z.ZodType<T>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T, R>('POST', endpoint, schema, body, options)
  }
  async put<T, R = unknown>(
    endpoint: string,
    body: R,
    schema?: z.ZodType<T>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T, R>('PUT', endpoint, schema, body, options)
  }
  async delete<T>(
    endpoint: string,
    schema?: z.ZodType<T>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, schema, undefined, options)
  }

  async patch<T, R = unknown>(
    endpoint: string,
    body: R,
    schema?: z.ZodType<T>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T, R>('PATCH', endpoint, schema, body, options)
  }
}

export const createApiClient = (
  baseUrl: string,
  defaultHeaders?: HeadersInit
) => {
  return new ApiClient(baseUrl, defaultHeaders)
}
