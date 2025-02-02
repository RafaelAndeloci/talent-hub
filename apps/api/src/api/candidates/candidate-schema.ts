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
import { Language } from '../../enums/language';
import { AddressSchema } from '../../schemas/address-schema';
import { ContactSchema } from '../../schemas/contact-schema';
import { ParamsSchema } from '../../schemas/params-schema';
import { PeriodSchema } from '../../schemas/period-schema';
import { RelatedWebsiteSchema } from '../../schemas/related-websites-schema';
import { YearMonthSchema } from '../../schemas/year-month-schema';
import { sortModelsByPeriod, isValidModelPeriods } from '../../utils/period-utils';
import { buildQuerySchema, buildFileSchema, DateSchema } from '../../utils/schemas';
import { Uf } from '../../enums/uf';
import { config } from '../../config/environment';
import { FindAllCandidatesQuery } from './types/find-all-candidates-query';
import { FindAllArgs } from '../../types/find-all-args';
const { fileStorage } = config;

type QueryType = FindAllCandidatesQuery extends FindAllArgs<infer U> ? U : never;
export const FindAllCandidatesSchema = z.object({
    query: buildQuerySchema<QueryType>({
        searches: [
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

export const FindCandidateByIdSchema = ParamsSchema;

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
        professionalHeadline: z.string().max(100).nullable(),
        contact: ContactSchema,
        address: AddressSchema,
        about: z.string().nullable(),
        hobbies: z.array(z.string().max(100)),
        social: RelatedWebsiteSchema,
        isAvailableForWork: z.boolean(),
        allowThirdPartyApplications: z.boolean(),
        preferences: z.object({
            salary: z.number().nullable(),
            contractType: z.nativeEnum(ContractType).nullable(),
            employmentType: z.nativeEnum(EmploymentType).nullable(),
            workplaceType: z.nativeEnum(WorkplaceType).nullable(),
            benefits: z
                .array(z.nativeEnum(Benefit))
                .refine((benefits) => _.uniq(benefits).length === benefits.length),
            positionLevel: z.nativeEnum(PositionLevel).nullable(),
        }),
        experiences: z.object({
            education: z
                .array(
                    z.object({
                        degree: z.string().max(150),
                        fieldOfStudy: z.string().max(150).nullable(),
                        type: z.nativeEnum(AcademicDegreeType),
                        status: z.nativeEnum(AcademicStatus),
                        institution: z.string().max(150),
                        institutionWebsite: z.string().max(150).nullable(),
                        description: z.string().max(300).nullable(),
                        period: PeriodSchema,
                        isCurrent: z.boolean(),
                        semesters: z.number().nullable(),
                        currentSemester: z.number().nullable(),
                        institutionRegistrationNumber: z.string().max(100).nullable(),
                        gradePointAverage: z.number().nullable(),
                        expectedGraduation: YearMonthSchema.nullable(),
                    }),
                )
                .default([])
                .transform(sortModelsByPeriod)
                .refine(
                    (educs) =>
                        _.uniqBy(educs, (educ) => `${educ.degree}${educ.institution}`).length ===
                        educs.length,
                    'Educational experiences must be unique',
                )
                .refine(isValidModelPeriods, 'Periods must not overlap'),
            professional: z
                .array(
                    z.object({
                        position: z.string().max(100),
                        description: z.string().max(500).nullable(),
                        company: z.string().max(150),
                        employmentType: z.nativeEnum(EmploymentType),
                        workplaceType: z.nativeEnum(WorkplaceType),
                        positionLevel: z.nativeEnum(PositionLevel),
                        isCurrent: z.boolean(),
                        period: PeriodSchema,
                        location: z.object({
                            city: z.string().max(100),
                            uf: z.nativeEnum(Uf),
                            neighborhood: z.string().max(150),
                        }),
                        relatedSkills: z
                            .array(z.string().max(150))
                            .refine((skills) => _.uniq(skills).length === skills.length),
                        responsabilities: z
                            .array(z.string().max(200))
                            .refine((resps) => _.uniq(resps).length === resps.length),
                    }),
                )
                .default([])
                .transform(sortModelsByPeriod)
                .refine(
                    (profs) =>
                        _.uniqBy(profs, (prof) => `${prof.position}${prof.company}`).length ===
                        profs.length,
                    'Professional experiences must be unique',
                )
                .refine(isValidModelPeriods, 'Periods must not overlap'),
        }),
        languages: z
            .array(
                z.object({
                    language: z.nativeEnum(Language),
                    writtenLevel: z.nativeEnum(LanguageProficiency),
                    spokenLevel: z.nativeEnum(LanguageProficiency),
                    readingLevel: z.nativeEnum(LanguageProficiency),
                    listeningLevel: z.nativeEnum(LanguageProficiency),
                }),
            )
            .default([])
            .refine(
                (langs) => _.uniqBy(langs, 'language').length === langs.length,
                `Languages must be unique`,
            ),
        references: z
            .array(
                z.object({
                    name: z.string().max(150),
                    position: z.string().max(150),
                    company: z.string().max(150).nullable(),
                    email: z.string().email(),
                    phone: z.string(),
                    relationship: z.string(),
                }),
            )
            .default([])
            .refine(
                (refs) =>
                    _.uniqBy(refs, (ref) => `${ref.name}${ref.email}${ref.phone}`).length ===
                    refs.length,
                'References must be unique',
            ),
        achievements: z
            .array(
                z.object({
                    name: z.string().max(150),
                    type: z.nativeEnum(AchievementType),
                    issuer: z.string().max(150),
                    workload: z
                        .number()
                        .refine((p) => p > 0)
                        .nullable(),
                    issueDate: DateSchema.nullable(),
                    expirationDate: DateSchema.nullable(),
                    credentialId: z.string().max(300).nullable(),
                    credentialUrl: z.string().nullable(),
                    relatedSkills: z.array(z.string().max(100)).default([]),
                }),
            )
            .default([])
            .refine(
                (achievs) => _.uniqBy(achievs, 'name').length === achievs.length,
                'Achievements must be unique',
            ),
    }),
});

export const UpdateCandidateSchema = ParamsSchema.extend({
    body: CreateCandidateSchema.shape.body,
});

export const DeleteCandidateSchema = ParamsSchema;

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
