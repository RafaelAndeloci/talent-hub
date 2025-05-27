import { z } from 'zod'

export const personalInfoSchema = z.object({
  fullName: z
    .string({ message: 'Nome completo deve ser informado' })
    .min(2, 'Nome completo deve ter no mínimo 2 caracteres'),
  birthDate: z
    .string({ message: 'Data de nascimento deve ser informada' })
    .min(1, 'Data de nascimento deve ser informada'),
  professionalHeadline: z.string().optional(),
  about: z.string().optional(),
  social: z
    .object({
      linkedin: z
        .string()
        .url('Digite uma URL Válida')
        .optional()
        .or(z.literal('')),
      github: z
        .string()
        .url('Digite uma URL Válida')
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url('Digite uma URL Válida')
        .optional()
        .or(z.literal('')),
      portfolio: z
        .string()
        .url('Digite uma URL Válida')
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
  courseName: z
    .string({ message: 'Nome do curso deve ser informado' })
    .min(2, 'Nome do curso deve conter no mínimo 2 caracteres.'),
  institutionName: z
    .string({ message: 'Nome da instituição deve ser informada' })
    .min(2, 'Nome da instituição deve ter no mínimo 2 caracteres'),
  degreeType: z.string().min(1, 'Por favor selecione uma opção'),
  startDate: z.string().min(1, 'Data de inicio deve ser informada'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  gradePointAverage: z.string().optional(),
})

// Step 4: Professional Schema
export const professionalSchema = z.object({
  position: z
    .string({ message: 'Posição deve ser informada' })
    .min(2, 'Posição deve ter no mínimo 2 caracteres'),
  company: z
    .string({ message: 'Nome da empresa deve ser informada' })
    .min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  description: z.string().optional(),
  startDate: z
    .string({ message: 'Data de início deve ser informada' })
    .min(1, 'Data de inicio deve ser informada'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  employmentType: z.string().min(1, 'Por favor selecione uma opção'),
  workplaceType: z.string().min(1, 'Por favor selecione uma opção'),
})

// Step 5: Languages and Skills Schema
export const languagesAndSkillsSchema = z.object({
  languages: z.array(
    z.object({
      language: z.string().min(1, 'Língua deve ser informada'),
      writtenLevel: z.string().min(1, 'Nível de escrita deve ser informada'),
      spokenLevel: z.string().min(1, 'Nível de fala deve ser informada'),
      readingLevel: z.string().min(1, 'Nível de leitura deve ser informada'),
      listeningLevel: z.string().min(1, 'Nível de audição deve ser informado'),
    })
  ),
  skills: z.array(
    z.object({
      skillName: z.string().min(1, 'Nome da habilidade deve ser informada'),
      skillType: z.string().min(1, 'Tipo de habilidade deve ser informada'),
      skillLevel: z.string().min(1, 'Nível deve ser informada'),
    })
  ),
})

// Combined schema for all steps
export const candidateFormSchema = z.object({
  personalInfo: personalInfoSchema,
  preferences: preferencesSchema.optional(),
  academic: academicSchema,
  professional: professionalSchema,
  languagesAndSkills: languagesAndSkillsSchema,
})
export type PersonalStepSchema = z.infer<typeof personalInfoSchema>
export type PreferencesStepSchema = z.infer<typeof preferencesSchema>
export type AcademicStepSchema = z.infer<typeof academicSchema>
export type ProfessionalStepSchema = z.infer<typeof professionalSchema>
export type LanguagesAndSkillsStepSchema = z.infer<
  typeof languagesAndSkillsSchema
>
export type CandidateForm = z.infer<typeof candidateFormSchema>
