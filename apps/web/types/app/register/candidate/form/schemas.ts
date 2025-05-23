import { z } from 'zod'

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  birthDate: z.string().min(1, 'Birth date is required'),
  professionalHeadline: z.string().optional(),
  about: z.string().optional(),
  social: z
    .object({
      linkedin: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
      github: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
      portfolio: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
    })
    .optional(),
})

// Step 2: Preferences Schema
export const preferencesSchema = z.object({
  salary: z.string().optional(),
  employmentRegime: z.string().optional(),
  employmentType: z.string().optional(),
  workplaceType: z.string().optional(),
  positionLevel: z.string().optional(),
  benefits: z.array(z.string()).optional(),
})

// Step 3: Academic Schema
export const academicSchema = z.object({
  courseName: z.string().min(2, 'Course name must be at least 2 characters'),
  institutionName: z
    .string()
    .min(2, 'Institution name must be at least 2 characters'),
  degreeType: z.string().min(1, 'Please select a degree type'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  gradePointAverage: z.string().optional(),
})

// Step 4: Professional Schema
export const professionalSchema = z.object({
  position: z.string().min(2, 'Position must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  employmentType: z.string().min(1, 'Please select an employment type'),
  workplaceType: z.string().min(1, 'Please select a workplace type'),
})

// Step 5: Languages and Skills Schema
export const languagesAndSkillsSchema = z.object({
  languages: z
    .array(
      z.object({
        language: z.string().min(1, 'Language is required'),
        writtenLevel: z.string().min(1, 'Written level is required'),
        spokenLevel: z.string().min(1, 'Spoken level is required'),
        readingLevel: z.string().min(1, 'Reading level is required'),
        listeningLevel: z.string().min(1, 'Listening level is required'),
      })
    )
    .min(1, 'Please add at least one language'),
  skills: z
    .array(
      z.object({
        skillName: z.string().min(1, 'Skill name is required'),
        skillType: z.string().min(1, 'Skill type is required'),
        skillLevel: z.string().min(1, 'Skill level is required'),
      })
    )
    .min(1, 'Please add at least one skill'),
})

// Combined schema for all steps
export const candidateFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...preferencesSchema.shape,
  ...academicSchema.shape,
  ...professionalSchema.shape,
  ...languagesAndSkillsSchema.shape,
})
export type PersonalStepSchema = z.infer<typeof personalInfoSchema>
export type PreferencesStepSchema = z.infer<typeof preferencesSchema>
export type AcademicStepSchema = z.infer<typeof academicSchema>
export type ProfessionalStepSchema = z.infer<typeof professionalSchema>
export type LanguagesAndSkillsStepSchema = z.infer<
  typeof languagesAndSkillsSchema
>
export type CandidateForm = z.infer<typeof candidateFormSchema>
