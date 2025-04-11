import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{11}$/),
});

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
  cvUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  professionalHeadline: z.string(),
  birthDate: z.date(),
  about: z.string(),
  hobbies: z.array(z.string().max(100)),
  social: z.array(socialSchema),
  contact: contactSchema,
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
