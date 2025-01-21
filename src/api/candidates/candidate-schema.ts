import { z } from 'zod';
import schemaBuilder from '../../utils/schema-builder';
import {
  Benefit,
  EmploymentType,
  WorkloadType,
  WorkplaceType,
  ContractType,
  LanguageProficiency,
  Proficiency,
  SkillType,
  AcademicCourseType,
  AcademicStatus,
  PositionLevel,
  AchievementType,
} from '@prisma/client';

const urlSchema = z.string().url().max(255);

const languageSchema = z.object({
  language: z.string().max(100),
  written: z.nativeEnum(LanguageProficiency),
  spoken: z.nativeEnum(LanguageProficiency),
  listening: z.nativeEnum(LanguageProficiency),
  reading: z.nativeEnum(LanguageProficiency),
});

const skillSchema = z.object({
  name: z.string(),
  proficiency: z.nativeEnum(Proficiency),
  type: z.nativeEnum(SkillType),
});

const academicProject = z.object({
  name: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
});

const academicExperienceSchema = z.object({
  name: z.string().min(3).max(100),
  institutionName: z.string().max(150),
  institutionUrl: urlSchema,
  type: z.nativeEnum(AcademicCourseType),
  fieldOfStudy: z.string().max(100),
  startDate: schemaBuilder.buildDate(),
  endDate: schemaBuilder.buildDate().optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  status: z.nativeEnum(AcademicStatus),
  graduationForecast: schemaBuilder.buildDate().optional().nullable(),
  semesters: z.number().int().optional().nullable(),
  currentSemester: z.number().int().optional().nullable(),
  institutionRegistry: z.string().max(50).optional().nullable(),
  projects: z.array(academicProject),
});

const professionalExperienceSchema = z.object({
  companyName: z.string().max(150),
  companyUrl: urlSchema.optional().nullable(),
  position: z.string().max(100),
  positionLevel: z.nativeEnum(PositionLevel),
  description: z.string().max(500).optional().nullable(),
  startDate: schemaBuilder.buildDate(),
  endDate: schemaBuilder.buildDate().optional().nullable(),
  current: z.boolean().default(false),
  responsibilities: z.array(z.string().max(100)),
  technologies: z.array(z.string().max(100)),
});

const achievementSchema = z.object({
  type: z.nativeEnum(AchievementType),
  title: z.string().max(150),
  description: z.string().max(500).optional().nullable(),
  date: schemaBuilder.buildDate().optional().nullable(),
  certificateUrl: urlSchema.optional().nullable(),
});

const referenceSchema = z.object({
  name: z.string().max(150),
  phone: z.string().regex(/^\d{11}$/),
  email: z.string().email().max(150),
  relationship: z.string().max(100),
  position: z.string().max(100),
  positionLevel: z.nativeEnum(PositionLevel),
  company: z.string().max(150),
  companyUrl: urlSchema.optional().nullable(),
});

const candidateSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().min(3).max(255),
  birthDate: schemaBuilder.buildDate(),
  phone: z.string().regex(/^\d{11}$/),
  address: z.object({
    neighborhood: z.string().max(255),
    city: z.string().max(255),
    state: z.string().length(2),
  }),
  bio: z.string().max(500).optional().nullable(),
  hobbies: z.array(z.string().max(255)).optional().nullable(),
  linkedinUrl: urlSchema.optional().nullable(),
  githubUrl: urlSchema.optional().nullable(),
  instagramUrl: urlSchema.optional().nullable(),
  professionalHeadline: z.string().max(255).optional().nullable(),
  desiredSalary: z.number().min(0).optional().nullable(),
  autoMatchEnabled: z.boolean().default(true),
  desiredWorkplaceType: z.nativeEnum(WorkplaceType).optional().nullable(),
  desiredWorkloadType: z.nativeEnum(WorkloadType).optional().nullable(),
  desiredEmploymentType: z.nativeEnum(EmploymentType).optional().nullable(),
  desiredContractType: z.nativeEnum(ContractType).optional().nullable(),
  desiredBenefits: z.array(z.nativeEnum(Benefit)).optional().nullable(),
  desiredPositionLevel: z.nativeEnum(PositionLevel).optional().nullable(),
  languages: z.array(languageSchema).default([]),
  academicExperiences: z.array(academicExperienceSchema).default([]),
  professionalExperiences: z.array(professionalExperienceSchema).default([]),
  skills: z.array(skillSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
  references: z.array(referenceSchema).default([]),
});

const jobApplicationSchema = z.object({
  jobOpportunityId: z.string().uuid(),
});

const candidateSchemas = {
  create: z.object({ body: candidateSchema }),
  update: z.object({
    params: z.object({ id: z.string().uuid() }),
    body: candidateSchema.omit({ userId: true }).partial(),
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
