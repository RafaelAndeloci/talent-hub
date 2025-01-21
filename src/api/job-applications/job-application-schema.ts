import { z } from 'zod';
import schemaBuilder from '../../utils/schema-builder';
import { JobApplicationStatus } from '@prisma/client';

const jobApplicationSchemas = {
  apply: z.object({
    body: z.object({
      candidateId: z.string().uuid(),
      jobOpportunityId: z.string().uuid(),
    }),
  }),
  update: z.object({
    body: z.object({
      status: z.nativeEnum(JobApplicationStatus).optional(),
      interviewNotes: z.array(z.string()).optional(),
      rejectionReason: z.string().optional(),
    }),
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  updateFeedback: z.object({
    body: z.object({
      title: z.string().optional(),
      message: z.string().optional(),
    }),
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  findAll: z.object({
    query: schemaBuilder.buildQuery({
      sortingFields: ['appliedAt', 'updatedAt', 'status'],
      searchFields: ['status', 'jobOpportunityId', 'candidateId'],
    }),
  }),
  findById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  remove: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
};

export default jobApplicationSchemas;
