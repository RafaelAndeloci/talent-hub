import { z } from 'zod';
import { PositionLevel } from '../types/position-level';
import { SalaryRangeSchema } from './salary-range';
import { EmploymentRegime } from '../types/employment-regime';
import { Benefit } from '../types/benefit';
import moment from 'moment';
import { SkillType } from '../types/skill-type';
import { AcademicDegreeLevel } from '../types/academic-degree-type';
import { Language } from '../types/language';
import { LanguageProficiency } from '../types/language-proficiency';
import Schema from '../utils/schema-builder';
import { JobOpeningStatus } from '../types/job-opening-status';

// <schema>
export const SkillProfileSchema = z.object({
    mandatory: z.boolean(),
    minLevel: z.number().int().positive().min(0).max(10),
    skill: z.object({
        id: Schema.id(),
        name: z.string().nullish().default(null),
        type: z.nativeEnum(SkillType).nullish().default(null),
    }),
});

export const CourseProfileSchema = z.object({
    course: z.object({
        id: Schema.id(),
        name: z.string().nullish().default(null),
    }),
    semestreRange: z.object({
        min: z.number().int().positive().min(0).nullable().default(null),
        max: z.number().int().positive().min(0).nullable().default(null),
    }),
    completed: z.boolean(),
    gradePointAverageMin: z.number().int().positive().min(0).nullable().default(null),
});

export const LanguageProficiencyProfileSchema = z.object({
    language: z.nativeEnum(Language),
    writtenLevel: z.nativeEnum(LanguageProficiency),
    spokenLevel: z.nativeEnum(LanguageProficiency),
    readingLevel: z.nativeEnum(LanguageProficiency),
    listeningLevel: z.nativeEnum(LanguageProficiency),
});

export const JobOpeningCandidateProfileSchema = z.object({
    yearsOfExperience: z.number().int().positive().min(0).nullable().default(null),
    skills: SkillProfileSchema.array()
        .refine((skills) => {
            const ids = skills.map((s) => s.skill.id);
            return ids.length === new Set(ids).size;
        })
        .default([]),
    minimumEducationLevel: z.nativeEnum(AcademicDegreeLevel).nullable().default(null),
    gradePointAverageMin: z.number().int().positive().min(0).nullable().default(null),
    courses: CourseProfileSchema.array()
        .refine((courses) => {
            const ids = courses.map((c) => c.course.id);
            return ids.length === new Set(ids).size;
        })
        .default([]),
    languages: LanguageProficiencyProfileSchema.array()
        .refine((languages) => {
            const ids = languages.map((l) => l.language);
            return ids.length === new Set(ids).size;
        })
        .default([]),
    certifications: z.string().min(3).max(100).array().default([]),
});

export const JobOpeningSchema = z.strictObject({
    id: z.string().uuid(),
    position: z.string().min(3).max(100),
    company: z.object({
        id: Schema.id(),
        tradeName: z.string().nullish().default(null),
    }),
    selectedApplicationId: Schema.id().nullable(),
    status: z.nativeEnum(JobOpeningStatus),
    positionLevel: z.nativeEnum(PositionLevel),
    salaryRange: SalaryRangeSchema.nullable(),
    employmentRegime: z.nativeEnum(EmploymentRegime),
    benefits: z.object({
        custom: z.string().min(3).max(100).array(),
        fixed: z.nativeEnum(Benefit).array(),
    }),
    deadline: Schema.moment().refine((value) => value.isValid() && value.isAfter(moment()), {
        message: 'Invalid deadline',
    }),
    responsibilities: z
        .string()
        .min(3)
        .max(1000)
        .array()
        .refine((res) => new Set(res).size === res.length, {
            message: 'Responsibilities must be unique',
        }),
    requirements: z
        .string()
        .min(3)
        .max(1000)
        .array()
        .refine((req) => new Set(req).size === req.length, {
            message: 'Requirements must be unique',
        }),
    profile: JobOpeningCandidateProfileSchema,
});

export const JobOpeningPayloadSchema = JobOpeningSchema.omit({ id: true });

export const FillJobOpeningPayloadSchema = JobOpeningSchema.pick({
    selectedApplicationId: true,
}).strict();
// </schema>

// <type>
export type FillJobOpeningPayload = z.infer<typeof FillJobOpeningPayloadSchema>;
export type JobOpening = z.infer<typeof JobOpeningSchema>;
export type JobOpeningPayload = z.infer<typeof JobOpeningPayloadSchema>;
export type SkillProfile = z.infer<typeof SkillProfileSchema>;
export type CourseProfile = z.infer<typeof CourseProfileSchema>;
export type LanguageProficiencyProfile = z.infer<typeof LanguageProficiencyProfileSchema>;
export type CandidateExpectedProfile = z.infer<typeof JobOpeningCandidateProfileSchema>;
export enum JobOpeningUpdateStatusAction {
    Open = 'open',
    Close = 'close',
    ToDraft = 'toDraft',
    Fill = 'fill',
}
// </type>

type JobOpeningQuery = Omit<JobOpening, 'company'> & {
    'company.id': string;
};

export const JobOpeningApiSchema = {
    FindById: Schema.paramsWithId(),
    FindAll: Schema.query<JobOpeningQuery>()
        .paginate()
        .sort(['position', 'company.id', 'status', 'positionLevel', 'employmentRegime', 'deadline'])
        .filter([
            {
                field: 'company.id',
                operators: 'eq',
                builder: (value) => ({ 'company.id': value }),
            },
            {
                field: 'status',
                operators: 'eq',
            },
            {
                field: 'positionLevel',
                operators: 'eq',
            },
            {
                field: 'employmentRegime',
                operators: 'eq',
            },
            {
                field: 'position',
                operators: ['eq', 'contains', 'like', 'startsWith', 'endsWith'],
            },
        ])
        .build(),
    Create: z.object({
        body: JobOpeningPayloadSchema,
    }),
    Update: Schema.paramsWithId().extend({
        body: JobOpeningPayloadSchema,
    }),
    UpdateStatus: z
        .object({
            params: z.object({
                id: Schema.id(),
                action: z.nativeEnum(JobOpeningUpdateStatusAction),
            }),
            body: FillJobOpeningPayloadSchema.nullish().default(null),
        }),
    Remove: Schema.paramsWithId(),
};
