"use server";

import {
  LoginRequest,
  loginRequestSchema,
} from "@/types/app/login/login-request";

export async function loginAction(payload: LoginRequest) {
  return login(payload);
}

// Do not export this.
async function login(payload: LoginRequest) {
  const { success, data, error } =
    await loginRequestSchema.safeParseAsync(payload);
}
