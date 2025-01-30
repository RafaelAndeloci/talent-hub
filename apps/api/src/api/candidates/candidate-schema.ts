import moment from 'moment';
import { z } from 'zod';
import _ from 'lodash';

import { LanguageProficiency } from './types/enums/language-proficiency';
import { AchievementType } from './types/enums/achievement-type';
import { EmploymentType } from './types/enums/employment-type';
import { WorkplaceType } from './types/enums/workplace-type';
import { PositionLevel } from './types/enums/position-level';
import { AcademicDegreeType } from './types/enums/academic-degree-type';
import { AcademicStatus } from './types/enums/academic-status';
import { ContractType } from './types/enums/contract-type';
import { Benefit } from './types/enums/benefit';
import { Candidate } from './types/candidate';
import { config } from '../../config/environment';
import { Language } from '../../enums/language';
import { AddressSchema } from '../../schemas/address-schema';
import { ContactSchema } from '../../schemas/contact-schema';
import { ParamsSchema } from '../../schemas/params-schema';
import { PeriodSchema } from '../../schemas/period-schema';
import { RelatedWebsiteSchema } from '../../schemas/related-websites-schema';
import { YearMonthSchema } from '../../schemas/year-month-schema';
import { validatePeriodsOverlap } from '../../utils/period-utils';
import { buildQuerySchema, buildFileSchema } from '../../utils/schemas';

const { fileStorage } = config;

/**
 * @swagger
 *  components:
 *    schemas:
 *      CandidateLanguageSchema:
 *        type: object
 *        properties:
 *          language:
 *            type: string
 *          writtenLevel:
 *            type: string
 *            enum: [basic, intermediate, advanced, fluent, native]
 *          spokenLevel:
 *            type: string
 *            enum: [basic, intermediate, advanced, fluent, native]
 *          readingLevel:
 *            type: string
 *            enum: [basic, intermediate, advanced, fluent, native]
 *          listeningLevel:
 *            type: string
 *            enum: [basic, intermediate, advanced, fluent, native]
 */
const CandidateLanguageSchema = z.object({
    language: z.nativeEnum(Language),
    writtenLevel: z.nativeEnum(LanguageProficiency),
    spokenLevel: z.nativeEnum(LanguageProficiency),
    readingLevel: z.nativeEnum(LanguageProficiency),
    listeningLevel: z.nativeEnum(LanguageProficiency),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidateReferenceSchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          maxLength: 100
 *        position:
 *          type: string
 *          maxLength: 100
 *        company:
 *          type: string
 *          nullable: true
 *          maxLength: 100
 *        email:
 *          type: string
 *          format: email
 *        phone:
 *          type: string
 *          pattern: '^\d{11}$'
 *        relationship:
 *          type: string
 *          maxLength: 100
 */

const CandidateReferenceSchema = z.object({
    name: z.string(),
    position: z.string(),
    company: z.string().nullable(),
    email: z.string().email(),
    phone: z.string(),
    relationship: z.string(),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidateAchievementSchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        type:
 *          type: string
 *          enum: [certification, award, license, patent, publication, scholarship, course]
 *        issuer:
 *          type: string
 *        issueDate:
 *          $ref: '#/components/schemas/YearMonthSchema'
 *        expirationDate:
 *          $ref: '#/components/schemas/YearMonthSchema'
 *        credentialId:
 *          type: string
 *          nullable: true
 *        credentialUrl:
 *          type: string
 *          nullable: true
 *        relatedSkills:
 *          type: array
 *          items:
 *            type: string
 *            maxLength: 100
 */
const CandidateAchievementSchema = z.object({
    name: z.string(),
    type: z.nativeEnum(AchievementType),
    issuer: z.string(),
    issueDate: YearMonthSchema,
    expirationDate: YearMonthSchema.nullable(),
    credentialId: z.string().nullable(),
    credentialUrl: z.string().nullable(),
    relatedSkills: z.array(z.string().max(100)),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidateProfessionalExperienceSchema:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        company:
 *          type: string
 *        employmentType:
 *          $ref: '#/components/schemas/EmploymentTypeSchema'
 *        workplaceType:
 *          $ref: '#/components/schemas/WorkplaceTypeSchema'
 *        positionLevel:
 *          $ref: '#/components/schemas/PositionLevelSchema'
 *        isCurrent:
 *          type: boolean
 *        period:
 *          $ref: '#/components/schemas/PeriodSchema'
 *        location:
 *          type: object
 *        relatedSkills:
 *          type: array
 *          items:
 *            type: string
 *            maxLength: 100
 */
const CandidateProfessionalExperienceSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    company: z.string(),
    employmentType: z.nativeEnum(EmploymentType),
    workplaceType: z.nativeEnum(WorkplaceType),
    positionLevel: z.nativeEnum(PositionLevel),
    isCurrent: z.boolean(),
    period: PeriodSchema,
    location: z.object({}).nullable(),
    relatedSkills: z
        .array(z.string().max(100))
        .refine((skills) => _.uniq(skills).length === skills.length),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidateEducationalExperienceSchema:
 *      type: object
 *      properties:
 *        degree:
 *          type: string
 *        fieldOfStudy:
 *          type: string
 *        type:
 *          $ref: '#/components/schemas/AcademicDegreeTypeSchema'
 *        status:
 *          $ref: '#/components/schemas/AcademicStatusSchema'
 *        institution:
 *          type: string
 *        institutionWebsite:
 *          type: string
 *          nullable: true
 *        description:
 *          type: string
 *          nullable: true
 *        period:
 *          $ref: '#/components/schemas/PeriodSchema'
 *        isCurrent:
 *          type: boolean
 *        semesters:
 *          type: number
 *          nullable: true
 *        currentSemester:
 *          type: number
 *          nullable: true
 *        institutionRegistrationNumber:
 *          type: string
 *          nullable: true
 *        gradePointAverage:
 *          type: number
 *          nullable: true
 *        expectedGraduation:
 *          $ref: '#/components/schemas/YearMonthSchema'
 *          nullable: true
 */
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
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidatePreferencesSchema:
 *      type: object
 *      properties:
 *        salary:
 *          type: number
 *          nullable: true
 *        contractType:
 *          $ref: '#/components/schemas/ContractTypeSchema'
 *        employmentType:
 *           $ref: '#/components/schemas/EmploymentTypeSchema'
 *        workplaceType:
 *          $ref: '#/components/schemas/WorkplaceTypeSchema'
 *        benefits:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/BenefitSchema'
 *        positionLevel:
 *          $ref: '#/components/schemas/PositionLevelSchema'
 */
const CandidatePreferencesSchema = z.object({
    salary: z.number().nullable(),
    contractType: z.nativeEnum(ContractType).nullable(),
    employmentType: z.nativeEnum(EmploymentType).nullable(),
    workplaceType: z.nativeEnum(WorkplaceType).nullable(),
    benefits: z
        .array(z.nativeEnum(Benefit))
        .refine((benefits) => _.uniq(benefits).length === benefits.length),
    positionLevel: z.nativeEnum(PositionLevel).nullable(),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CandidateExperiencesSchema:
 *      type: object
 *      properties:
 *        education:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateEducationalExperienceSchema'
 *        professional:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateProfessionalExperienceSchema'
 */

const CandidateExperiencesSchema = z.object({
    education: z
        .array(CandidateEducationalExperienceSchema)
        .default([])
        .refine(
            (educs) =>
                _.uniqBy(educs, (educ) => `${educ.degree}${educ.institution}`).length ===
                educs.length,
            'Educational experiences must be unique',
        )
        .refine(validatePeriodsOverlap, 'Periods must not overlap'),
    professional: z
        .array(CandidateProfessionalExperienceSchema)
        .default([])
        .refine(
            (profs) =>
                _.uniqBy(profs, (prof) => `${prof.title}${prof.company}`).length === profs.length,
            'Professional experiences must be unique',
        )
        .refine(validatePeriodsOverlap, 'Periods must not overlap'),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateCandidateSchema:
 *      type: object
 *      properties:
 *        fullName:
 *          type: string
 *          maxLength: 100
 *        birthDate:
 *          type: string
 *          format: date
 *        professionalHeadline:
 *          type: string
 *          maxLength: 100
 *          nullable: true
 *        contact:
 *          $ref: '#/components/schemas/ContactSchema'
 *        address:
 *          $ref: '#/components/schemas/AddressSchema'
 *        about:
 *          type: string
 *          maxLength: 500
 *          nullable: true
 *        hobbies:
 *          type: array
 *          items:
 *            type: string
 *            maxLength: 100
 *        social:
 *          $ref: '#/components/schemas/RelatedWebsiteSchema'
 *        isAvailableForWork:
 *          type: boolean
 *        allowThirdPartyApplications:
 *          type: boolean
 *        preferences:
 *          $ref: '#/components/schemas/CandidatePreferencesSchema'
 *        experiences:
 *          $ref: '#/components/schemas/CandidateExperiencesSchema'
 *        languages:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateLanguageSchema'
 *        references:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateReferenceSchema'
 *        achievements:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateAchievementSchema'
 */
export const CreateCandidateSchema = z.object({
    body: z.object({
        fullName: z.string().min(3).max(100),
        birthDate: z.string().refine((value) => {
            const date = moment(value, 'YYYY-MM-DD', true);
            return (
                date.isValid() &&
                date.isBefore(moment()) &&
                date.isAfter(moment().subtract(100, 'years'))
            );
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
            .refine(
                (langs) => _.uniqBy(langs, 'language').length === langs.length,
                `Languages must be unique`,
            ),
        references: z
            .array(CandidateReferenceSchema)
            .default([])
            .refine(
                (refs) => _.uniqBy(refs, 'name').length === refs.length,
                'References must be unique',
            ),
        achievements: z
            .array(CandidateAchievementSchema)
            .default([])
            .refine(
                (achievs) => _.uniqBy(achievs, 'name').length === achievs.length,
                'Achievements must be unique',
            ),
    }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateCandidateSchema:
 *      type: object
 *      properties:
 *        fullName:
 *          type: string
 *          maxLength: 100
 *          nullable: true
 *        birthDate:
 *          type: string
 *          format: date
 *          nullable: true
 *        professionalHeadline:
 *          type: string
 *          maxLength: 100
 *          nullable: true
 *        contact:
 *          $ref: '#/components/schemas/ContactSchema'
 *          nullable: true
 *        address:
 *          $ref: '#/components/schemas/AddressSchema'
 *          nullable: true
 *        about:
 *          type: string
 *          maxLength: 500
 *          nullable: true
 *        hobbies:
 *          type: array
 *          items:
 *            type: string
 *            maxLength: 100
 *          nullable: true
 *        social:
 *          $ref: '#/components/schemas/RelatedWebsiteSchema'
 *          nullable: true
 *        isAvailableForWork:
 *          type: boolean
 *          nullable: true
 *        allowThirdPartyApplications:
 *          type: boolean
 *          nullable: true
 *        preferences:
 *          $ref: '#/components/schemas/CandidatePreferencesSchema'
 *          nullable: true
 *        experiences:
 *          $ref: '#/components/schemas/CandidateExperiencesSchema'
 *          nullable: true
 *        languages:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateLanguageSchema'
 *          nullable: true
 *        references:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateReferenceSchema'
 *          nullable: true
 *        achievements:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CandidateAchievementSchema'
 *          nullable: true
 */
export const UpdateCandidateSchema = ParamsSchema.extend({
    body: CreateCandidateSchema.shape.body.partial(),
});

export const DeleteCandidateSchema = ParamsSchema;

export const FindCandidateByIdSchema = ParamsSchema;

type CandidateQuery = Candidate & {
    contactEmail: string;
    contactPhone: string;
    ['address.zipCode']: string;
    salaryPreference: number;
    contractTypePreference: string;
    employmentTypePreference: string;
    workplaceTypePreference: string;
    positionLevelPreference: string;
};

/**
 * @swagger
 * components:
 *  schemas:
 *    FindAllCandidatesSchema:
 *      type: object
 *      properties:
 *        query:
 *          type: object
 *          properties:
 *            limit:
 *              $ref: '#/components/schemas/LimitSchema'
 *            offset:
 *              $ref: '#/components/schemas/OffsetSchema'
 *            search:
 *              type: object
 *              properties:
 *                fullName:
 *                  type: string
 *                id:
 *                  type: string
 *                allowThirdPartyApplications:
 *                  type: string
 *                isAvailableForWork:
 *                  type: string
 *                contactEmail:
 *                  type: string
 *                contactPhone:
 *                  type: string
 *                birthDate:
 *                  type: string
 *                salaryPreference:
 *                  type: string
 *                contractTypePreference:
 *                  type: string
 *                employmentTypePreference:
 *                  type: string
 *                workplaceTypePreference:
 *                  type: string
 *                positionLevelPreference:
 *                  type: string
 *                address.zipCode:
 *                  type: string
 *            sort:
 *              type: string
 */
export const FindAllCandidatesSchema = z.object({
    query: buildQuerySchema<CandidateQuery>({
        searchs: [
            {
                field: 'fullName',
                operators: ['eq', 'like', 'iLike', 'endsWith', 'startsWith', 'substring'],
            },
            { field: 'id', operators: ['eq'] },
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
                operators: ['eq', 'like', 'iLike', 'endsWith', 'startsWith', 'substring'],
            },
            {
                field: 'contactPhone',
                operators: ['eq', 'like', 'iLike', 'endsWith', 'startsWith', 'substring'],
            },
            { field: 'birthDate', operators: ['eq', 'gt', 'lt'] },
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
                    Object.values(ContractType).includes(value as ContractType)
                        ? null
                        : 'Invalid contract type',
            },
            {
                field: 'employmentTypePreference',
                operators: ['eq'],
                validation: (value) =>
                    Object.values(EmploymentType).includes(value as EmploymentType)
                        ? null
                        : 'Invalid employment type',
            },
            {
                field: 'workplaceTypePreference',
                operators: ['eq'],
                validation: (value) =>
                    Object.values(WorkplaceType).includes(value as WorkplaceType)
                        ? null
                        : 'Invalid workplace type',
            },
            {
                field: 'positionLevelPreference',
                operators: ['eq'],
                validation: (value) =>
                    Object.values(PositionLevel).includes(value as PositionLevel)
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
        sorts: ['fullName', 'id', 'allowThirdPartyApplications', 'isAvailableForWork'],
    }),
});

export const UpdateCandidateCvSchema = ParamsSchema.extend({
    file: buildFileSchema({
        maxSize: fileStorage.cv.maxSize,
        allowedMimeTypes: fileStorage.cv.allowedTypes,
    }),
});

export const UpdateCandidateBannerSchema = ParamsSchema.extend({
    file: buildFileSchema({
        maxSize: config.fileStorage.images.maxSize,
        allowedMimeTypes: config.fileStorage.images.allowedTypes,
    }),
});
