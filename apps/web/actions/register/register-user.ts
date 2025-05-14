"use server";

import { CreateUserPayload } from "@/lib/schemas/user/create-user-payload";
import { CreateUserResponse } from "@/lib/schemas/user/create-user-response";
import { requestHandler } from "@/service/request-handler";
import { ApiResponse } from "@/types/service/api";

export async function createUserAction(data: CreateUserPayload) {
  return createUser(data);
}

// Do not export
async function createUser(
  data: CreateUserPayload,
): Promise<ApiResponse<CreateUserResponse>> {
  const endpoint = "/users";
  return await requestHandler<CreateUserResponse>({
    endpoint,
    method: "POST",
    data,
  });
}
