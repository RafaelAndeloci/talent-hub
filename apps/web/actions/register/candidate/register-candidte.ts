'use server'

import { createApiClient } from '@/lib/api/request-handler'
import {
  CreateCandidateRequest,
  createCandidateRequestSchema,
} from '@/types/app/register/candidate/create-candidate-request'

import { ApiResponse, ErrorCode } from '@/types/service/api'
import { env } from '@talent-hub/env'
import { z } from 'zod'

const api = createApiClient(env.API_HOST)

export async function createCandidateAction(
  payload: CreateCandidateRequest
): Promise<ApiResponse<never>> {
  return await createCandidate(payload)
}

// Do not export
async function createCandidate(
  payload: CreateCandidateRequest
): Promise<ApiResponse<never>> {
  try {
    const validPayload = createCandidateRequestSchema.parse(payload)
    const response = await api.post<never>('/candidate/', validPayload)
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
