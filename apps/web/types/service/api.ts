export type ApiResponse<T = unknown> = {
  success: boolean
  data: T | null
  error: ApiError | null
  timestamp: string
}

export type ApiError = {
  code: string
  message: string
  details?: unknown
}

export type ApiRequestOptions = {
  headers?: HeadersInit
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}
