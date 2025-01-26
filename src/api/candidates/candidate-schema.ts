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
import { buildQuerySchema } from '../../shared/utils/schema-builder'
import { Candidate } from './types/entities/candidate'
import { config } from '../../config/environment'

const { fileStorage } = config

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

export const DeleteCandidateSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const FindCandidateByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

type CandidateQuery = Candidate & {
  contactEmail: string
  contactPhone: string
  ['address.zipCode']: string
  salaryPreference: number
  contractTypePreference: string
  employmentTypePreference: string
  workplaceTypePreference: string
  positionLevelPreference: string
}

export const FindAllCandidatesSchema = z.object({
  query: buildQuerySchema<CandidateQuery>({
    searchFields: [
      {
        field: 'fullName',
        operators: [
          'eq',
          'like',
          'iLike',
          'endsWith',
          'startsWith',
          'substring',
        ],
      },
      {
        field: 'id',
        operators: ['eq'],
      },
      {
        field: 'allowThirdPartyApplications',
        operators: ['eq'],
        transform: (value) => value === 'true',
      },
      {
        field: 'isAvailableForWork',
        operators: ['eq'],
        transform: (value) => value === 'true',
      },
      {
        field: 'contactEmail',
        operators: [
          'eq',
          'like',
          'iLike',
          'endsWith',
          'startsWith',
          'substring',
        ],
      },
      {
        field: 'contactPhone',
        operators: [
          'eq',
          'like',
          'iLike',
          'endsWith',
          'startsWith',
          'substring',
        ],
      },
      {
        field: 'birthDate',
        operators: ['eq', 'gt', 'lt'],
      },
      {
        field: 'salaryPreference',
        operators: ['eq', 'gt', 'lt'],
        transform: (value) => Number(value),
        validation: (value) =>
          !Number.isNaN(value) && Number(value) >= 0
            ? null
            : 'salaryPreference must be a positive number',
      },
      {
        field: 'contractTypePreference',
        operators: ['eq'],
        validation: (value) =>
          Object.values(ContractType).includes(value)
            ? null
            : 'Invalid contract type',
      },
      {
        field: 'employmentTypePreference',
        operators: ['eq'],
        validation: (value) =>
          Object.values(EmploymentType).includes(value)
            ? null
            : 'Invalid employment type',
      },
      {
        field: 'workplaceTypePreference',
        operators: ['eq'],
        validation: (value) =>
          Object.values(WorkplaceType).includes(value)
            ? null
            : 'Invalid workplace type',
      },
      {
        field: 'positionLevelPreference',
        operators: ['eq'],
        validation: (value) =>
          Object.values(PositionLevel).includes(value)
            ? null
            : 'Invalid position level',
      },
      {
        field: 'address.zipCode',
        operators: ['eq'],
        validation: (value) =>
          value.trim().length === 8 ? null : 'zipCode must have 8 characters',
      },
    ],
    sortFields: [
      'fullName',
      'id',
      'allowThirdPartyApplications',
      'isAvailableForWork',
    ],
  }),
})

export const UpdateCandidateCvSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  file: z.object({
    mimetype: z
      .string()
      .refine((value) => fileStorage.cv.allowedTypes.includes(value), {
        message: `Invalid file type. Allowed types: ${fileStorage.cv.allowedTypes.join(', ')}`,
      }),
    buffer: z.any().refine(
      (value) => {
        const buffer: Buffer = value

        return buffer.length > 0 && buffer.length <= fileStorage.cv.maxSize
      },
      { message: `File size must be less than ${fileStorage.cv.maxSize}MB` },
    ),
  }),
})

export const UpdateCandidateBannerSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  file: z.object({
    mimetype: z
      .string()
      .refine((value) => fileStorage.images.allowedTypes.includes(value), {
        message: `Invalid file type. Allowed types: ${fileStorage.images.allowedTypes.join(', ')}`,
      }),
    buffer: z.any().refine(
      (value) => {
        const buffer: Buffer = value

        return buffer.length > 0 && buffer.length <= fileStorage.images.maxSize
      },
      {
        message: `File size must be less than ${fileStorage.images.maxSize}MB`,
      },
    ),
  }),
})
