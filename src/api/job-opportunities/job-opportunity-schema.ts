import { z } from 'zod';
import schemaBuilder from '../../utils/schema-builder';
import {
  AcademicCourseType,
  Benefit,
  ContractType,
  EmploymentType,
  JobOpportunityStatus,
  LanguageProficiency,
  PositionLevel,
  WorkloadType,
  WorkplaceType,
} from '@prisma/client';

const desiredLanguageSchema = z.object({
  language: z.string().min(3).max(255),
  written: z.nativeEnum(LanguageProficiency),
  spoken: z.nativeEnum(LanguageProficiency),
  reading: z.nativeEnum(LanguageProficiency),
  listening: z.nativeEnum(LanguageProficiency),
});

const jobOpportunitySchema = z.object({
  title: z.string().min(3).max(255),
  companyId: z.string().uuid(),
  description: z.string().min(3).max(255),
  positionLevel: z.nativeEnum(PositionLevel),
  workloadType: z.nativeEnum(WorkloadType),
  workplaceType: z.nativeEnum(WorkplaceType),
  employmentType: z.nativeEnum(EmploymentType),
  contractType: z.nativeEnum(ContractType),
  salary: z.number().positive(),
  benefits: z.array(z.nativeEnum(Benefit)).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  responsibilities: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  deadline: schemaBuilder.buildDate(),
  autoMatchEnabled: z.boolean().optional().default(false),
  status: z
    .nativeEnum(JobOpportunityStatus)
    .default(JobOpportunityStatus.DRAFT),
  desiredExperienceYears: z.number().positive().optional().default(0),
  desiredExperienceArea: z.string().optional().default(''),
  desiredEducationLevel: z.nativeEnum(AcademicCourseType).optional().nullable(),
  desiredCourse: z.string().optional().default(''),
  desiredLanguages: z.array(desiredLanguageSchema).optional().default([]),
  desiredSkills: z.array(z.string()).optional().default([]),
});

const jobOpportunitySchemas = {
  create: z.object({
    body: jobOpportunitySchema,
  }),

  update: z.object({
    body: jobOpportunitySchema.partial(),
    params: z.object({
      id: z.string(),
    }),
  }),

  remove: z.object({
    params: z.object({
      id: z.string(),
    }),
  }),

  findById: z.object({
    params: z.object({
      id: z.string(),
    }),
  }),

  findAll: z.object({
    query: schemaBuilder.buildQuery({
      searchFields: [
        'title',
        'description',
        'positionLevel',
        'workloadType',
        'workplaceType',
        'employmentType',
        'contractType',
        'salary',
        'benefits',
        'requirements',
        'responsibilities',
        'technologies',
        'deadline',
        'autoMatchEnabled',
        'status',
        'desiredExperienceYears',
        'desiredExperienceArea',
        'desiredEducationLevel',
        'desiredCourse',
        'desiredLanguages',
        'desiredSkills',
      ],
      sortingFields: [
        'title',
        'description',
        'positionLevel',
        'workloadType',
        'workplaceType',
        'employmentType',
        'contractType',
        'salary',
        'deadline',
        'autoMatchEnabled',
      ],
    }),
  }),
};

export default jobOpportunitySchemas;
