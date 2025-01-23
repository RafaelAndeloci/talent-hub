import { z } from 'zod'
import { RelatedWebsites } from '../types/related-websites'

export const RelatedWebsiteSchema: z.ZodType<RelatedWebsites> = z.object({
  linkedin: z.string().url().nullable(),
  github: z.string().url().nullable(),
  twitter: z.string().url().nullable(),
  facebook: z.string().url().nullable(),
  instagram: z.string().url().nullable(),
  youtube: z.string().url().nullable(),
  medium: z.string().url().nullable(),
  website: z.string().url().nullable(),
})
