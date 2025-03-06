import { z } from 'zod';
import { PositionLevel } from '../types/position-level';
import { SalaryRangeSchema } from './salary-range';
import { EmploymentRegime } from '../types/employment-regime';
import { Benefit } from '../types/benefit';
import moment from 'moment';
import { SkillType } from '../types/skill-type';
import { AcademicDegreeType } from '../types/academic-degree-type';
import { Language } from '../types/language';
import { LanguageProficiency } from '../types/language-proficiency';

// <schema>
export const SkillProfileSchema = z.object({
    mandatory: z.boolean(),
    minLevel: z.number().int().positive().min(0).max(10),
    skill: z.object({
        id: z.string().uuid(),
        name: z.string(),
        type: z.nativeEnum(SkillType),
    })
});

export const CourseProfileSchema = z.object({
    academicDegreeType: z.nativeEnum(AcademicDegreeType),
    course: z.object({
        id: z.string().uuid(),
        name: z.string(),
    }),
});

export const LanguageProficiencyProfileSchema = z.object({
    language: z.nativeEnum(Language),
    writtenLevel: z.nativeEnum(LanguageProficiency),
    spokenLevel: z.nativeEnum(LanguageProficiency),
    readingLevel: z.nativeEnum(LanguageProficiency),
    listeningLevel: z.nativeEnum(LanguageProficiency),
});

export const CandidateExpectedProfileSchema = z.object({
    yearsOfExperience: z.number().int().positive().min(0),
    skills: SkillProfileSchema.array().refine((skills) => {
        const ids = skills.map((s) => s.skill.id);
        return ids.length === new Set(ids).size;
    }),
    minimumEducationLevel: z.nativeEnum(AcademicDegreeType).nullable().default(null),
    gradePointAverageMin: z.number().int().positive().min(0).nullable().default(null),
    courses: CourseProfileSchema.array().refine((courses) => {
        const ids = courses.map((c) => c.course.id);
        return ids.length === new Set(ids).size;
    }),
    languages: LanguageProficiencyProfileSchema.array().refine((languages) => {
        const ids = languages.map((l) => l.language);
        return ids.length === new Set(ids).size;
    }),
    certifications: z.string().min(3).max(100).array(),
});

export const JobOpeningSchema = z.strictObject({
    id: z.string().uuid(),
    position: z.string().min(3).max(100),
    companyId: z.string().uuid(),
    positionLevel: z.nativeEnum(PositionLevel),
    salaryRange: SalaryRangeSchema,
    employmentRegime: z.nativeEnum(EmploymentRegime),
    benefits: z.object({
        custom: z.string().min(3).max(100).array(),
        fixed: z.nativeEnum(Benefit).array(),
    }),
    deadline: z
        .string()
        .transform((value) => moment(value))
        .refine((value) => value.isValid() && value.isAfter(moment()), {
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
    profile: CandidateExpectedProfileSchema,
});
// </schema>

// <type>
export type JobOpening = z.infer<typeof JobOpeningSchema>;

export type SkillProfile = z.infer<typeof SkillProfileSchema>;

export type CourseProfile = z.infer<typeof CourseProfileSchema>;

export type LanguageProficiencyProfile = z.infer<typeof LanguageProficiencyProfileSchema>;

export type CandidateExpectedProfile = z.infer<typeof CandidateExpectedProfileSchema>;
// </type>
