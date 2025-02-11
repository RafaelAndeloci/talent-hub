import _ from 'lodash';
import moment from 'moment';
import { z } from 'zod';

import { buildQuerySchema } from '../../utils/schemas';
import {
    JobOpening,
    FilterOperator,
    JobOpeningStatus,
    PositionLevel,
    WorkplaceType,
    EmploymentType,
    EmploymentRegime,
    Benefit,
    SkillType,
    Proficiency,
    AcademicDegreeType,
    Language,
    LanguageProficiency,
} from '@talent-hub/shared';
import { ParamsSchema } from '../../schemas/params-schema';

export const FindJobOpeningByIdSchema = ParamsSchema;

export type JobOpeningQuery = Omit<
    JobOpening,
    'salary' | 'profile' | 'requirements' | 'responsabilities'
> & {
    minimumSalary: number;
    maximumSalary: number;
    yearsOfExperience: number;
};

export const FindAllJobOpeningsSchema = z.object({
    query: buildQuerySchema<JobOpeningQuery>({
        sorts: [
            'positionLevel',
            'status',
            'positionLevel',
            'workplaceType',
            'employmentType',
            'minimumSalary',
            'maximumSalary',
            'employmentRegime',
            'deadline',
        ],
        searches: [
            {
                field: 'position',
                operators: [FilterOperator.eq, FilterOperator.endsWith, FilterOperator.startsWith],
            },
            {
                field: 'status',
                operators: [FilterOperator.eq, FilterOperator.not, FilterOperator.in],
                validation: (status) =>
                    Object.values(JobOpeningStatus).includes(status as JobOpeningStatus)
                        ? null
                        : `Invalid status. Possible values: ${Object.values(JobOpeningStatus).join(', ')}`,
            },
            {
                field: 'positionLevel',
                operators: [FilterOperator.eq],
                validation: (level) =>
                    Object.values(PositionLevel).includes(level as PositionLevel)
                        ? null
                        : `Invalid position level. Possible values: ${Object.values(PositionLevel).join(', ')}`,
            },
            {
                field: 'workplaceType',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(WorkplaceType).includes(type as WorkplaceType)
                        ? null
                        : `Invalid workplace type. Possible values: ${Object.values(WorkplaceType).join(', ')}`,
            },
            {
                field: 'employmentType',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(EmploymentType).includes(type as EmploymentType)
                        ? null
                        : `Invalid employment type. Possible values: ${Object.values(EmploymentType).join(', ')}`,
            },
            {
                field: 'employmentRegime',
                operators: [FilterOperator.eq],
                validation: (type) =>
                    Object.values(EmploymentRegime).includes(type as EmploymentRegime)
                        ? null
                        : `Invalid contract type. Possible values: ${Object.values(EmploymentRegime).join(', ')}`,
            },
            {
                field: 'deadline',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.gt,
                    FilterOperator.lt,
                    FilterOperator.gte,
                    FilterOperator.lte,
                ],
                transform: (value) => moment(value).toDate(),
            },
            {
                field: 'minimumSalary',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.gt,
                    FilterOperator.lt,
                    FilterOperator.gte,
                    FilterOperator.lte,
                ],
                transform: (value) => parseFloat(value),
                validation: (value) => {
                    const num = parseFloat(value);
                    return isNaN(num) || num < 0 ? 'Invalid salary' : null;
                },
            },
            {
                field: 'maximumSalary',
                operators: [
                    FilterOperator.eq,
                    FilterOperator.gt,
                    FilterOperator.lt,
                    FilterOperator.gte,
                    FilterOperator.lte,
                ],
                transform: (value) => parseFloat(value),
                validation: (value) => {
                    const num = parseFloat(value);
                    return isNaN(num) || num < 0 ? 'Invalid salary' : null;
                },
            },
            {
                field: 'benefits',
                operators: [FilterOperator.in, FilterOperator.notIn],
                validation: (benefit) =>
                    Object.values(Benefit).includes(benefit as Benefit)
                        ? null
                        : `Invalid benefit. Possible values: ${Object.values(Benefit).join(', ')}`,
            },
        ],
    }).strict(),
});

export const CreateJobOpeningSchema = z.object({
    body: z
        .object({
            position: z.string().min(3).max(100),
            description: z.string().min(3).max(1000),
            companyId: z.string().uuid(),
            positionLevel: z.nativeEnum(PositionLevel),
            workplaceType: z.nativeEnum(WorkplaceType),
            employmentType: z.nativeEnum(EmploymentType),
            salary: z.object({
                min: z.number().int().min(0),
                max: z.number().int().min(0),
            }),
            employmentRegime: z.nativeEnum(EmploymentRegime),
            benefits: z.array(z.nativeEnum(Benefit)),
            deadline: z.string().refine((value) => {
                const date = moment(value);
                return date.isValid() && date.isAfter(moment());
            }, 'Invalid deadline'),
            responsibilities: z
                .array(z.string().min(3).max(1000))
                .refine(
                    (res) => _.uniq(res).length === res.length,
                    'Responsibilities must be unique',
                ),
            requirements: z
                .array(z.string().min(3).max(1000))
                .refine((req) => _.uniq(req).length === req.length, 'Requirements must be unique'),
            profile: z.object({
                yearsOfExperience: z.number().int().min(0),
                skills: z
                    .array(
                        z.object({
                            skillId: z.string().uuid(),
                            skillType: z.nativeEnum(SkillType).optional(),
                            skillName: z.string().optional(),
                            mandatory: z.boolean(),
                            proficiencyLevel: z.nativeEnum(Proficiency),
                        }),
                    )
                    .refine((skills) => {
                        const ids = skills.map((s) => s.skillId);
                        return ids.length === _.uniq(ids).length;
                    }, 'Skills must be unique'),
                minimumEducationLevel: z.nativeEnum(AcademicDegreeType).nullable().default(null),
                gradePointAvaregeMin: z.number().int().min(0).nullable().default(null),
                courses: z.array(z.string().min(3).max(1000)),
                languages: z.array(
                    z.object({
                        language: z.nativeEnum(Language),
                        writtenLevel: z.nativeEnum(LanguageProficiency),
                        spokenLevel: z.nativeEnum(LanguageProficiency),
                        readingLevel: z.nativeEnum(LanguageProficiency),
                        listeningLevel: z.nativeEnum(LanguageProficiency),
                    }),
                ),
                certifications: z.array(z.string().min(3).max(1000)),
            }),
        })
        .strict(),
});

export const UpdateJobOpeningSchema = ParamsSchema.extend({
    body: CreateJobOpeningSchema.shape.body.omit({ companyId: true }).strict(),
});

export const DeleteJobOpeningSchema = ParamsSchema;

export const UpdateJobOpeningStatusSchema = ParamsSchema;

export const FillJobOpeningSchema = ParamsSchema.extend({
    body: z
        .object({
            selectedApplicationId: z.string().uuid(),
        })
        .strict(),
});
