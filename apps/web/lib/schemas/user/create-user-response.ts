import { z } from "zod";
export const CreateUserResponseSchema = z.object({});
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
