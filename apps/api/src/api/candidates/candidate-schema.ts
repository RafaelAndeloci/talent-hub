import moment from 'moment';
import { z } from 'zod';
import _ from 'lodash';

import { AddressSchema } from '../../schemas/address-schema';
import { ContactSchema } from '../../schemas/contact-schema';
import { ParamsSchema } from '../../schemas/params-schema';
import { PeriodSchema } from '../../schemas/period-schema';
import { RelatedWebsiteSchema } from '../../schemas/related-websites-schema';
import { YearMonthSchema } from '../../schemas/year-month-schema';
import { sortModelsByPeriod, isValidModelPeriods } from '../../utils/period-utils';
import { buildQuerySchema, buildFileSchema, DateSchema } from '../../utils/schemas';
import { config } from '../../config/environment';
import {
    AcademicDegreeType,
    AcademicStatus,
    AchievementType,
    Benefit,
    EmploymentRegime,
    EmploymentType,
    FilterOperator,
    FindAllCandidatesQueryArgs,
    Language,
    LanguageProficiency,
    PositionLevel,
    Uf,
    WorkplaceType,
} from '@talent-hub/shared';
const { fileStorage } = config;

export const FindAllCandidatesSchema = z.object({
    query: buildQuerySchema<FindAllCandidatesQueryArgs>({
        searches: [
            {
                field: 'fullName',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.endsWith,
                    FilterOperator.startsWith,
                    FilterOperator.substring,
                ],
            },
            { field: 'id', operators: [FilterOperator.eq] },
            {
                field: 'allowThirdPartyApplications',
                operators: [FilterOperator.eq],
                transform: (value) => value === 'true',
            },
            {
                field: 'isAvailableForWork',
                operators: [FilterOperator.eq],
                transform: (value) => value === 'true',
            },
            {
                field: 'contactEmail',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.endsWith,
                    FilterOperator.startsWith,
                    FilterOperator.substring,
                ],
            },
            {
                field: 'contactPhone',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.like,
                    FilterOperator.iLike,
                    FilterOperator.endsWith,
                    FilterOperator.startsWith,
                    FilterOperator.substring,
                ],
            },
            {
                field: 'birthDate',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.gt,
                    FilterOperator.lt,
                    FilterOperator.gte,
                    FilterOperator.lte,
                ],
            },
            {
                field: 'salaryPreference',
                operators: [FilterOperator.eq, FilterOperator.gt, FilterOperator.lt],
                transform: (value) => Number(value),
                validation: (value) =>
                    !Number.isNaN(value) && Number(value) >= 0
                        ? null
                        : 'salaryPreference must be a positive number',
            },
            {
                field: 'contractTypePreference',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(EmploymentRegime).includes(value as EmploymentRegime)
                        ? null
                        : 'Invalid contract type',
            },
            {
                field: 'employmentTypePreference',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(EmploymentType).includes(value as EmploymentType)
                        ? null
                        : 'Invalid employment type',
            },
            {
                field: 'workplaceTypePreference',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(WorkplaceType).includes(value as WorkplaceType)
                        ? null
                        : 'Invalid workplace type',
            },
            {
                field: 'positionLevelPreference',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    Object.values(PositionLevel).includes(value as PositionLevel)
                        ? null
                        : 'Invalid position level',
            },
            {
                field: 'address.zipCode',
                operators: [FilterOperator.eq],
                validation: (value) =>
                    value.trim().length === 8 ? null : 'zipCode must have 8 characters',
            },
        ],
        sorts: ['fullName', 'id', 'allowThirdPartyApplications', 'isAvailableForWork'],
    }).strict(),
});

export const FindCandidateByIdSchema = ParamsSchema;

export const CreateCandidateSchema = z.object({
    body: z
        .object({
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
                contractType: z.nativeEnum(EmploymentRegime).nullable(),
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
                            _.uniqBy(educs, (educ) => `${educ.degree}${educ.institution}`)
                                .length === educs.length,
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
        })
        .strict(),
});

export const UpdateCandidateSchema = ParamsSchema.extend({
    body: CreateCandidateSchema.shape.body,
});

export const DeleteCandidateSchema = ParamsSchema;

export const UpdateCandidateCvSchema = ParamsSchema.extend({
    file: buildFileSchema({
        maxSize: fileStorage.cv.maxSize,
        allowedMimeTypes: fileStorage.cv.allowedTypes,
    }).strict(),
});

export const UpdateCandidateBannerSchema = ParamsSchema.extend({
    file: buildFileSchema({
        maxSize: config.fileStorage.images.maxSize,
        allowedMimeTypes: config.fileStorage.images.allowedTypes,
    }).strict(),
});
