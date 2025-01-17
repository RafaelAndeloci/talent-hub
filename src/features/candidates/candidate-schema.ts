import { z } from "zod";

const candidateSchema = {
  create: z.object({
    body: z.object({
      fullName: z.string().min(3).max(255),
      phoneNumber: z.string().min(10).max(15),
      email: z.string().email().max(255),
      address: z.string().max(255),
      resume: z.string().url().max(255),
    }),
  }),
  getById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  getAll: z.object({
    query: z.object({
      limit: z.preprocess(
        val => parseInt(val as any),
        z.number().int().min(1).max(100).default(10).optional(),
      ),
      offset: z.preprocess(
        val => parseInt(val as any),
        z.number().int().min(0).default(0).optional(),
      ),
      orderBy: z.enum(['id', 'fullName', 'phoneNumber']).default('id').optional(),
      order: z.enum(['asc', 'desc']).default('asc').optional(),
      searchBy: z
        .enum(['fullName', 'phoneNumber'])
        .default('fullName')
        .optional(),
      search: z.string().optional(),
    }),
  }),
  update: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
    body: z.object({
      fullName: z.string().min(3).max(255),
      phoneNumber: z.string().min(10).max(15),
      email: z.string().email().max(255),
      address: z.string().max(255),
      resume: z.string().url().max(255),
    }),
  }),
  remove: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
};

export default candidateSchema;