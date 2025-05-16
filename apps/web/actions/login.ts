'use server'

import { createApiClient } from '@/lib/api/request-handler'
import {
  LoginRequest,
  loginRequestSchema,
} from '@/types/app/login/login-request'
import {
  LoginResponse,
  loginResponseSchema,
} from '@/types/app/login/login-response'
import { ApiResponse, ErrorCode } from '@/types/service/api'
import { env } from '@talent-hub/env'
import { z } from 'zod'

const api = createApiClient(env.API_HOST)

export async function loginAction(
  payload: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  return await login(payload)
}

// Do not export
async function login(
  payload: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const validPayload = loginRequestSchema.parse(payload)

    const response = await api.post<LoginResponse>(
      '/users/auth',
      validPayload,
      loginResponseSchema
    )
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Parâmetros inválidos',
          details: error.errors,
        },
        timestamp: new Date().toISOString(),
      }
    }
    return {
      success: false,
      data: null,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
      timestamp: new Date().toISOString(),
    }
  }
}
