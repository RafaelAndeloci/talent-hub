import moment from 'moment';
import { z } from 'zod';
import { Benefit } from '../types/benefit';
import { Language } from '../types/language';
import { LanguageProficiency } from '../types/language-proficiency';
import { Address, AddressSchema } from './address';
import { Contact, ContactSchema } from './contact';
import { PeriodSchema } from './period';
import { SocialMedias, SocialMediasSchema } from './social-medias';
import Schema from '../utils/schema-builder';
import AcademicStatus from '../types/academic-status';
import AchievementType from '../types/achievement-type';
import { AcademicDegreeLevel } from '../types/academic-degree-type';
import { EmploymentRegime } from '../types/employment-regime';
import { EmploymentType } from '../types/employment-type';
import { PositionLevel } from '../types/position-level';
import { SkillType } from '../types/skill-type';
import { WorkplaceType } from '../types/workplace-type';

const AcademicBackgroundSchema = z.object({
    id: Schema.id(),
    candidate: z.object({ id: Schema.id() }),
    status: z.nativeEnum(AcademicStatus),
    course: z.object({
        id: Schema.id(),
        name: z.string().nullish().default(null),
        degreeType: z.nativeEnum(AcademicDegreeLevel).nullish().default(null),
    }),
    institution: z.object({
        id: Schema.id(),
        name: z.string().nullish().default(null),
    }),
    period: PeriodSchema,
    isCurrent: z.boolean(),
    semesters: z.number().nullable(),
    currentSemester: z.number().nullable(),
    institutionRegistrationNumber: z.string().nullable(),
    gradePointAverage: z.number().nullable(),
    expectedGraduation: Schema.datePart(),
});

export const AcademicBackgroundPayloadSchema = AcademicBackgroundSchema.omit({
    id: true,
    candidate: true,
});

export const CandidatePreferencesSchema = z.object({
    salary: z.number().min(0),
    employmentRegime: z.nativeEnum(EmploymentRegime),
    employmentType: z.nativeEnum(EmploymentType),
    workplaceType: z.nativeEnum(WorkplaceType),
    benefits: z.array(z.nativeEnum(Benefit)),
    positionLevel: z.nativeEnum(PositionLevel),
});

export const ProfessionalExperienceSchema = z.object({
    id: Schema.id(),
    candidate: z.object({ id: Schema.id() }),
    position: z.string(),
    description: z.string().nullable(),
    company: z.string(),
    employmentType: z.nativeEnum(EmploymentType),
    workplaceType: z.nativeEnum(WorkplaceType),
    positionLevel: z.nativeEnum(PositionLevel),
    isCurrent: z.boolean(),
    period: PeriodSchema,
    address: AddressSchema,
    responsabilities: z.string().max(200).array(),
});

export const ProfessionalExperiencePayloadSchema = ProfessionalExperienceSchema.omit({
    id: true,
    candidate: true,
});

export const CandidateLanguageSchema = z.object({
    id: Schema.id(),
    candidate: z.object({ id: Schema.id() }),
    language: z.nativeEnum(Language),
    writtenLevel: z.nativeEnum(LanguageProficiency),
    spokenLevel: z.nativeEnum(LanguageProficiency),
    readingLevel: z.nativeEnum(LanguageProficiency),
    listeningLevel: z.nativeEnum(LanguageProficiency),
});

export const CandidateLanguagePayloadSchema = CandidateLanguageSchema.omit({
    id: true,
    candidate: true,
});

export const ReferenceSchema = z.object({
    id: Schema.id(),
    candidate: z.object({ id: Schema.id() }),
    name: z.string().max(150),
    position: z.string().max(150),
    company: z.string().nullable(),
    contact: ContactSchema,
    relationship: z.string(),
});

export const ReferencePayloadSchema = ReferenceSchema.omit({
    id: true,
    candidate: true,
});

export const AchievementCredentialSchema = z.object({
    id: z.string().max(300).nullable(),
    url: z.string().nullable(),
});

export const AchievementSchema = z.object({
    id: Schema.id(),
    candidate: z.object({
        id: Schema.id(),
    }),
    name: z.string().max(150),
    type: z.nativeEnum(AchievementType),
    issuer: z.string().max(150),
    workload: z.number().min(0).nullable(),
    issueDate: Schema.moment().nullable(),
    expirationDate: Schema.moment().nullable(),
    credential: AchievementCredentialSchema,
});

export const AchievementPayloadSchema = AchievementSchema.omit({
    id: true,
    candidate: true,
});

export const CandidateSkillSchema = z.object({
    id: Schema.id(),
    candidate: z.object({ id: Schema.id() }),
    skill: z.object({
        id: Schema.id(),
        name: z.string().nullable().default(null),
        type: z.nativeEnum(SkillType).nullable().default(null),
    }),
    level: z.number().min(1).max(10),
});

export const CandidateSkillPayloadSchema = CandidateSkillSchema.omit({
    id: true,
    candidate: true,
    skill: true,
}).extend({
    skill: z.object({
        id: Schema.id(),
    }),
});

export const CandidateSchema = z.object({
    id: Schema.id(),
    fullName: z.string(),
    userId: Schema.id(),
    cvUrl: z.string().url().nullable().default(null),
    bannerUrl: z.string().url().nullable().default(null),
    birthDate: z
        .string()
        .transform((value) => moment(value))
        .refine((value) => value.isValid(), {
            message: 'Invalid date',
        })
        .refine((value) => value.isBefore(moment()), {
            message: 'Birth date must be in the past',
        })
        .refine((value) => value.isAfter(moment().subtract(100, 'years')), {
            message: 'Birth date must be at least 100 years ago',
        }),
    professionalHeadline: z
        .string()
        .nullish()
        .default(null)
        .refine((value) => value === null || value.length <= 100, {
            message: 'Professional headline must have at most 100 characters',
        }),
    contact: ContactSchema,
    address: AddressSchema,
    about: z.string().nullish().default(null),
    hobbies: z.array(z.string().max(100)),
    social: SocialMediasSchema,
    isAvailableForWork: z.boolean(),
    allowThirdPartyApplications: z.boolean(),
    preferences: CandidatePreferencesSchema,
    academicBackgrounds: z.array(AcademicBackgroundSchema),
    professionalExperiences: z.array(ProfessionalExperienceSchema),
    languages: z.array(CandidateLanguageSchema),
    references: z.array(ReferenceSchema),
    achievements: z.array(AchievementSchema),
    skills: z.array(CandidateSkillSchema),
});

export const CandidatePayload = CandidateSchema.omit({
    id: true,
    userId: true,
    cvUrl: true,
    bannerUrl: true,
    academicBackgrounds: true,
    professionalExperiences: true,
    languages: true,
    references: true,
    achievements: true,
    skills: true,
});

export type AcademicBackground = z.infer<typeof AcademicBackgroundSchema>;
export type CandidatePreferences = z.infer<typeof CandidatePreferencesSchema>;
export type ProfessionalExperience = z.infer<typeof ProfessionalExperienceSchema>;
export type CandidateLanguage = z.infer<typeof CandidateLanguageSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type CandidateSkill = z.infer<typeof CandidateSkillSchema>;
export type Candidate = Omit<
    z.infer<typeof CandidateSchema>,
    | 'contact'
    | 'address'
    | 'social'
    | 'academicBackgrounds'
    | 'professionalExperiences'
    | 'languages'
    | 'references'
    | 'achievements'
    | 'skills'
    | 'preferences'
> & {
    contact: Contact;
    address: Address;
    preferences: CandidatePreferences;
    social: SocialMedias;
    academicBackgrounds: AcademicBackground[];
    professionalExperiences: ProfessionalExperience[];
    languages: CandidateLanguage[];
    references: Reference[];
    achievements: Achievement[];
    skills: CandidateSkill[];
};
export type CandidateDto = Omit<Candidate, 'userId'>;
export type AcademicBackgroundPayload = z.infer<typeof AcademicBackgroundPayloadSchema>;
export type ProfessionalExperiencePayload = z.infer<typeof ProfessionalExperiencePayloadSchema>;
export type CandidateLanguagePayload = z.infer<typeof CandidateLanguagePayloadSchema>;
export type ReferencePayload = z.infer<typeof ReferencePayloadSchema>;
export type AchievementPayload = z.infer<typeof AchievementPayloadSchema>;
export type CandidateSkillPayload = z.infer<typeof CandidateSkillPayloadSchema>;

export type CandidatePayload = z.infer<typeof CandidatePayload> & {
    academicBackgrounds: AcademicBackgroundPayload[];
    professionalExperiences: ProfessionalExperiencePayload[];
    languages: CandidateLanguagePayload[];
    references: ReferencePayload[];
    achievements: AchievementPayload[];
    skills: CandidateSkillPayload[];
};

export const CandidateApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<
        Omit<Candidate, 'preferences'> & {
            'preferences.salary': number;
            'preferences.employmentRegime': EmploymentRegime;
            'preferences.employmentType': EmploymentType;
            'preferences.workplaceType': WorkplaceType;
            'preferences.positionLevel': PositionLevel;
        }
    >()
        .paginate()
        .sort(['fullName', 'birthDate'])
        .filter([
            {
                field: 'fullName',
                operators: ['eq', 'like', 'startsWith', 'endsWith'],
            },
            {
                field: 'birthDate',
                operators: ['eq', 'gt', 'lt'],
            },
            {
                field: 'preferences.salary',
                operators: ['eq', 'gt', 'lt'],
                builder: (value) => ({ salaryPreference: value }),
            },
            {
                field: 'preferences.employmentRegime',
                operators: 'eq',
                builder: (value) => ({ employmentRegimePreference: value }),
            },
            {
                field: 'preferences.employmentType',
                operators: 'eq',
                builder: (value) => ({ employmentTypePreference: value }),
            },
            {
                field: 'preferences.workplaceType',
                operators: 'eq',
                builder: (value) => ({ workplaceTypePreference: value }),
            },
            {
                field: 'preferences.positionLevel',
                operators: 'eq',
                builder: (value) => ({ positionLevelPreference: value }),
            },
        ])
        .build(),
    Create: z.object({
        body: CandidatePayload,
    }),
    Update: Schema.paramsWithId().extend({
        body: CandidatePayload,
    }),
    Remove: Schema.paramsWithId(),
    SetBanner: Schema.paramsWithId().extend({
        ...Schema.file({
            allowedMimeTypes: ['image/jpeg', 'image/png'],
            maxFileSize: 5 * 1024 * 1024,
        }).shape,
    }),
    SetCv: Schema.paramsWithId().extend({
        ...Schema.file({
            allowedMimeTypes: ['application/pdf'],
            maxFileSize: 10 * 1024 * 1024,
        }).shape,
    }),
};
