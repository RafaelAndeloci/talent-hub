import { z } from 'zod';
import {
  AcademicCourseType,
  AcademicStatus,
  AchievementType,
  Benefit,
  ContractType,
  EmploymentType,
  LanguageProficiency,
  PositionLevel,
  Proficiency,
  SkillType,
  WorkloadType,
  WorkplaceType,
} from '@prisma/client';
import schemaBuilder from '../../utils/schema-builder';

const urlSchema = z.string().url().max(255);
const maxString = (max: number) => z.string().max(max);

const nestedLanguageSchema = z.object({
  language: maxString(100),
  written: z.nativeEnum(LanguageProficiency),
  spoken: z.nativeEnum(LanguageProficiency),
  listening: z.nativeEnum(LanguageProficiency),
  reading: z.nativeEnum(LanguageProficiency),
});

const nestedAcademicSchema = z.object({
  institutionName: maxString(150),
  institutionUrl: urlSchema,
  type: z.nativeEnum(AcademicCourseType),
  fieldOfStudy: maxString(100),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: maxString(500).optional(),
  status: z.nativeEnum(AcademicStatus),
  graduationForecast: z.date().optional(),
  semesters: z.number().int().optional(),
  currentSemester: z.number().int().optional(),
  institutionRegistry: maxString(50).optional(),
  projects: z.array(
    z.object({
      title: maxString(150),
      description: maxString(500).optional(),
      technologies: z.array(maxString(100)),
    }),
  ),
});

const nestedProfessionalSchema = z.object({
  companyName: maxString(150),
  companyUrl: urlSchema.optional(),
  role: maxString(100),
  description: maxString(500).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  responsibilities: z.array(maxString(100)),
  technologies: z.array(maxString(100)),
});

const nestedSkillSchema = z.object({
  name: maxString(100),
  proficiency: z.nativeEnum(Proficiency),
  type: z.nativeEnum(SkillType),
});

const nestedAchievementSchema = z.object({
  type: z.nativeEnum(AchievementType),
  title: maxString(150),
  description: maxString(500).optional(),
  date: z.date().optional(),
  certificateUrl: urlSchema.optional(),
});

const nestedReferenceSchema = z.object({
  name: maxString(150),
  phone: z.string().regex(/^\d{11}$/),
  email: z.string().email().max(150),
  relationship: maxString(100),
  role: maxString(100),
  position: maxString(100),
  positionLevel: z.nativeEnum(PositionLevel),
  company: maxString(150),
  companyUrl: urlSchema.optional(),
});

// Schemas principais
const bodySchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().min(3).max(255),
  birthDate: z.date(),
  phone: z.string().regex(/^\d{11}$/),
  address: z.object({
    neighborhood: maxString(255),
    city: maxString(255),
    state: z.string().length(2),
  }),
  bio: maxString(500),
  hobbies: z.array(maxString(255)),
  linkedinUrl: urlSchema,
  githubUrl: urlSchema,
  instagramUrl: urlSchema,
  professionalHeadline: maxString(255),
  desiredSalary: z.number().min(0),
  autoMatchEnabled: z.boolean().default(true),
  desiredWorkplaceType: z.nativeEnum(WorkplaceType),
  desiredWorkloadType: z.nativeEnum(WorkloadType),
  desiredEmploymentType: z.nativeEnum(EmploymentType),
  desiredContractType: z.nativeEnum(ContractType),
  desiredBenefits: z.array(z.nativeEnum(Benefit)),
  desiredPositionLevel: z.nativeEnum(PositionLevel),
  languages: z.array(nestedLanguageSchema).default([]),
  academicExperiences: z.array(nestedAcademicSchema).default([]),
  professionalExperiences: z.array(nestedProfessionalSchema).default([]),
  skills: z.array(nestedSkillSchema).default([]),
  achievements: z.array(nestedAchievementSchema).default([]),
  references: z.array(nestedReferenceSchema).default([]),
});

const candidateSchemas = {
  create: z.object({ body: bodySchema.omit({ userId: true }) }),
  update: z.object({
    params: z.object({ id: z.string().uuid() }),
    body: bodySchema.partial(),
  }),
  findById: z.object({ params: z.object({ id: z.string().uuid() }) }),
  findAll: z.object({
    query: schemaBuilder.buildQuery({
      searchFields: [
        'fullName',
        'phone',
        'desiredSalary',
        'desiredWorkplaceType',
        'desiredContractType',
        'professionalHeadline',
      ],
      sortingFields: ['id', 'phone', 'fullName', 'desiredSalary'],
    }),
  }),
  remove: z.object({ params: z.object({ id: z.string().uuid() }) }),
};

export default candidateSchemas;
