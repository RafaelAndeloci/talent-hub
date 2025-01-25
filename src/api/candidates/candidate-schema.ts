import moment from 'moment'
import { z } from 'zod'
import _ from 'lodash'

import { AddressSchema } from '../../shared/schemas/address-schema'
import { Language } from '../../shared/enums/language'
import { LanguageProficiency } from './types/enums/language-proficiency'
import { AchievementType } from './types/enums/achievement-type'
import { YearMonthSchema } from '../../shared/schemas/year-month-schema'
import { EmploymentType } from './types/enums/employment-type'
import { WorkplaceType } from './types/enums/workplace-type'
import { PositionLevel } from './types/enums/position-level'
import { PeriodSchema } from '../../shared/schemas/period-schema'
import { AcademicDegreeType } from './types/enums/academic-degree-type'
import { AcademicStatus } from './types/enums/academic-status'
import { ContractType } from './types/enums/contract-type'
import { Benefit } from './types/enums/benefit'
import { ContactSchema } from '../../shared/schemas/contact-schema'
import { RelatedWebsiteSchema } from '../../shared/schemas/related-websites-schema'

const CandidateLanguageSchema = z.object({
  language: z.nativeEnum(Language),
  writtenLevel: z.nativeEnum(LanguageProficiency),
  spokenLevel: z.nativeEnum(LanguageProficiency),
  readingLevel: z.nativeEnum(LanguageProficiency),
  listeningLevel: z.nativeEnum(LanguageProficiency),
})

const CandidateReferenceSchema = z.object({
  name: z.string(),
  position: z.string(),
  company: z.string().nullable(),
  email: z.string().email(),
  phone: z.string(),
  relationship: z.string(),
})

const CandidateAchievementSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(AchievementType),
  issuer: z.string(),
  issueDate: YearMonthSchema,
  expirationDate: YearMonthSchema.nullable(),
  credentialId: z.string().nullable(),
  credentialUrl: z.string().nullable(),
  relatedSkills: z.array(z.string().max(100)),
})

const CandidateProfessionalExperienceSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  company: z.string(),
  employmentType: z.nativeEnum(EmploymentType),
  workplaceType: z.nativeEnum(WorkplaceType),
  positionLevel: z.nativeEnum(PositionLevel),
  isCurrent: z.boolean(),
  period: PeriodSchema,
  location: z.object({}),
  relatedSkills: z
    .array(z.string().max(100))
    .refine((skills) => _.uniq(skills).length === skills.length),
})

const CandidateEducationalExperienceSchema = z.object({
  degree: z.string(),
  fieldOfStudy: z.string(),
  type: z.nativeEnum(AcademicDegreeType),
  status: z.nativeEnum(AcademicStatus),
  institution: z.string(),
  institutionWebsite: z.string().nullable(),
  description: z.string().nullable(),
  period: PeriodSchema,
  isCurrent: z.boolean(),
  semesters: z.number().nullable(),
  currentSemester: z.number().nullable(),
  institutionRegistrationNumber: z.string().nullable(),
  gradePointAverage: z.number().nullable(),
  expectedGraduation: YearMonthSchema.nullable(),
})

const CandidatePreferencesSchema = z.object({
  salary: z.number().nullable(),
  contractType: z.nativeEnum(ContractType).nullable(),
  employmentType: z.nativeEnum(EmploymentType).nullable(),
  workplaceType: z.nativeEnum(WorkplaceType).nullable(),
  benefits: z
    .array(z.nativeEnum(Benefit))
    .refine((benefits) => _.uniq(benefits).length === benefits.length),
  positionLevel: z.nativeEnum(PositionLevel).nullable(),
})

const CandidateExperiencesSchema = z.object({
  education: z
    .array(CandidateEducationalExperienceSchema)
    .default([])
    .refine(
      (educs) =>
        _.uniqBy(educs, (educ) => `${educ.degree}${educ.institution}`)
          .length === educs.length,
    ),
  professional: z.array(CandidateProfessionalExperienceSchema).default([]),
})

export const CreateCandidateSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).max(100),
    birthDate: z.string().refine((value) => {
      const date = moment(value, 'YYYY-MM-DD', true)
      return (
        date.isValid() &&
        date.isBefore(moment()) &&
        date.isAfter(moment().subtract(100, 'years'))
      )
    }),
    professionalHeadline: z.string().max(100).nullable().default(null),
    contact: ContactSchema,
    address: AddressSchema,
    about: z.string().max(500).nullable(),
    hobbies: z.array(z.string().max(100)),
    social: RelatedWebsiteSchema,
    isAvailableForWork: z.boolean(),
    allowThirdPartyApplications: z.boolean(),
    preferences: CandidatePreferencesSchema,
    experiences: CandidateExperiencesSchema,
    languages: z
      .array(CandidateLanguageSchema)
      .default([])
      .refine((langs) => _.uniqBy(langs, 'language').length === langs.length),
    references: z
      .array(CandidateReferenceSchema)
      .default([])
      .refine((refs) => _.uniqBy(refs, 'name').length === refs.length),
    achievements: z
      .array(CandidateAchievementSchema)
      .default([])
      .refine((achievs) => _.uniqBy(achievs, 'name').length === achievs.length),
  }),
})

export const UpdateCandidateSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: CreateCandidateSchema.shape.body.partial(),
})

export const FindCandidateByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
