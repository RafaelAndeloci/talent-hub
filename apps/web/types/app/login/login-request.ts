import { z } from "zod";

import { AuthPayloadSchema } from "@talent-hub/shared";

export const loginRequestSchema = AuthPayloadSchema;

export type LoginRequest = z.infer<typeof loginRequestSchema>;
