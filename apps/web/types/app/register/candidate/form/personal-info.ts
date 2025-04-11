import { z } from "zod";

export const socialSchema = z.object({
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  medium: z.string().url().optional(),
  youtube: z.string().url().optional(),
});

export const personalInfoSchema = z.object({
  fullName: z.string(),
  professionalHeadline: z.string(),
  birthDate: z.date(),
  cvUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  about: z.string(),
  hobbies: z.array(z.string().max(100)),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
