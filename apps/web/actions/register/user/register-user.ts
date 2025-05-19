'use server'

import { createApiClient } from '@/lib/api/request-handler'
import {
  RegisterUserRequest,
  registerUserRequestSchema,
} from '@/types/app/register/user/register-user-request'
import {
  RegisterUserResponse,
  registerUserResponseSchema,
} from '@/types/app/register/user/register-user-response'
import { ApiResponse, ErrorCode } from '@/types/service/api'
import { env } from '@talent-hub/env'
import { z } from 'zod'

const api = createApiClient(env.API_HOST)

export async function registerUserAction(
  payload: RegisterUserRequest
): Promise<ApiResponse<RegisterUserResponse>> {
  return await registerUser(payload)
}

// Do not export
async function registerUser(
  payload: RegisterUserRequest
): Promise<ApiResponse<RegisterUserResponse>> {
  try {
    const validPayload = registerUserRequestSchema.parse(payload)
    const response = await api.post<RegisterUserResponse>(
      '/users/create',
      validPayload,
      registerUserResponseSchema
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
