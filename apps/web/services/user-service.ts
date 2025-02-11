import { apiClient } from "./api-client";
import {
  AuthDto,
  AuthPayload, ConfirmUserEmailPayload,
  CreateUserPayload,
  Filter,
  FindAllUsersQuery,
  SendChangePasswordPayload,
  Sort,
  User,
  UserDto
} from "@talent-hub/shared";

export const userService = {
  findById: (id: string) => apiClient.get(`/api/users/${id}`),
  findAll: (query: FindAllUsersQuery) => {
    const queryString = new URLSearchParams();
    queryString.set("limit", query.limit.toString());
    queryString.set("offset", query.offset.toString());
    query.sort.forEach((sort: Sort<User>) => {
      queryString.append("sort", `${sort.field}:${sort.order}`);
    });
    queryString.set(
      "filter",
      query.filter
        .map(
          (filter: Filter<User>) =>
            `${filter.field}:${filter.operator}:${filter.value}`,
        )
        .join(","),
    );

    return apiClient.get(`/api/users?${queryString.toString()}`);
  },
  create: (payload: CreateUserPayload) =>
    apiClient.post<UserDto>("/api/users", payload),
  auth: (payload: AuthPayload) =>
    apiClient.post<AuthDto>("/api/users/auth", payload),
  updateProfilePicture: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient.put<UserDto>(
      `/api/users/${id}/profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  sendChangePasswordToken: (payload: SendChangePasswordPayload) =>
    apiClient.post<void>("/api/users/change-password", payload),
  confirmChangePassword: (id: string, payload: SendChangePasswordPayload) =>
    apiClient.post<void>(`/api/users/${id}/change-password/confirm`, payload),
  confirmEmail: (id: string, payload: ConfirmUserEmailPayload) =>
    apiClient.post<void>(`/api/users/${id}/confirm-email`, payload),
};
