"use server";

import { CreateUserPayload } from "@/components/app/register/register-form";
import { requestHandler } from "@/services/request-handler";

export async function createUserAction(data: CreateUserPayload) {
  return createUser(data);
}

// Do not export
async function createUser(data: CreateUserPayload) {
  return await requestHandler("POST", "/users", data);
}
