import * as uuid from 'uuid'

import { CandidateModel, CandidateModelAttributes } from './candidate-model'
import { makeRepository } from '../../shared/services/repository'
import { Candidate } from './types/entities/candidate'

export const candidateRepository = makeRepository<
  Candidate,
  CandidateModelAttributes,
  CandidateModel
>({
  model: CandidateModel,
  toDatabase: (candidate) => ({
    ...candidate,
    id: candidate.id || uuid.v4(),
    contactEmail: candidate.contact.email,
    contactPhone: candidate.contact.phone,
    workplaceTypePreference: candidate.preferences.workplaceType,
    positionLevelPreference: candidate.preferences.positionLevel,
    salaryPreference: candidate.preferences.salary,
    contractTypePreference: candidate.preferences.contractType,
    employmentTypePreference: candidate.preferences.employmentType,
    benefitsPreference: candidate.preferences.benefits,
    professionalExperiences: candidate.experiences.professional.map((a) => ({
      ...a,
      id: a.id || uuid.v4(),
      candidateId: candidate.id,
      startMonth: a.period.start.month,
      startYear: a.period.start.year,
      endMonth: a.period.end?.month ?? null,
      endYear: a.period.end?.year ?? null,
    })),
    educationalExperiences: candidate.experiences.education.map((a) => ({
      ...a,
      id: a.id || uuid.v4(),
      candidateId: candidate.id,
      expectedGraduationYear: a.expectedGraduation?.year ?? null,
      expectedGraduationMonth: a.expectedGraduation?.month ?? null,
      startMonth: a.period.start.month,
      startYear: a.period.start.year,
      endMonth: a.period.end?.month ?? null,
      endYear: a.period.end?.year ?? null,
    })),
    languages: candidate.languages.map((a) => ({
      ...a,
      id: a.id || uuid.v4(),
      candidateId: candidate.id,
    })),
    references: candidate.references.map((a) => ({
      ...a,
      id: a.id || uuid.v4(),
      candidateId: candidate.id,
    })),
    achievements: candidate.achievements.map((a) => ({
      ...a,
      id: a.id || uuid.v4(),
      candidateId: candidate.id,
      issueYear: a.issueDate.year,
      issueMonth: a.issueDate.month,
      expirationMonth: a.expirationDate?.month ?? null,
      expirationYear: a.expirationDate?.year ?? null,
    })),
    ...candidate.social,
  }),
  fromDatabase: ({ address, ...model }) => ({
    ...model,
    contact: {
      email: model.contactEmail,
      phone: model.contactPhone,
    },
    address: {
      ...address,
    },
    preferences: {
      salary: model.salaryPreference,
      contractType: model.contractTypePreference,
      employmentType: model.employmentTypePreference,
      workplaceType: model.workplaceTypePreference,
      positionLevel: model.positionLevelPreference,
      benefits: model.benefitsPreference,
    },
    experiences: {
      professional: model.professionalExperiences.map((a) => ({
        ...a,
        period: {
          start: {
            year: a.startYear,
            month: a.startMonth,
          },
          end:
            a.endMonth && a.endYear
              ? { year: a.endYear, month: a.endMonth }
              : null,
        },
      })),
      education: model.educationalExperiences.map((a) => ({
        ...a,
        period: {
          start: {
            year: a.startYear,
            month: a.startMonth,
          },
          end:
            a.endMonth && a.endYear
              ? { year: a.endYear, month: a.endMonth }
              : null,
        },
        expectedGraduation:
          a.expectedGraduationMonth && a.expectedGraduationYear
            ? {
                year: a.expectedGraduationYear,
                month: a.expectedGraduationMonth,
              }
            : null,
      })),
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    languages: model.languages.map(({ candidateId, ...rest }) => ({ ...rest })),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    references: model.references.map(({ candidateId, ...rest }) => ({
      ...rest,
    })),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    achievements: model.achievements.map(({ candidateId, ...rest }) => ({
      ...rest,
      issueDate: {
        year: rest.issueYear,
        month: rest.issueMonth,
      },
      expirationDate:
        rest.expirationMonth && rest.expirationYear
          ? { year: rest.expirationYear, month: rest.expirationMonth }
          : null,
    })),
    social: {
      linkedin: model.linkedin,
      github: model.github,
      twitter: model.twitter,
      facebook: model.facebook,
      instagram: model.instagram,
      youtube: model.youtube,
      medium: model.medium,
      website: model.website,
    },
  }),
})
