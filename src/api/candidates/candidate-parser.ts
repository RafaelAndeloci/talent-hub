import * as uuid from 'uuid'
import moment from 'moment'

import { Candidate } from './types/entities/candidate'
import { CreateCandidateDto } from './types/dtos/create-candidate-dto'
import { CandidateModelAttr } from './models'

export const merge = (
  candidate: Candidate,
  payload: Partial<Candidate>,
): Candidate => ({
  ...candidate,
  ...payload,
  contact: {
    ...candidate.contact,
    ...payload.contact,
  },
  preferences: {
    ...candidate.preferences,
    ...payload.preferences,
  },
  social: {
    ...candidate.social,
    ...payload.social,
  },
  experiences: {
    education: (
      payload.experiences?.education || candidate!.experiences.education
    ).map((e) => ({
      ...e,
      ...payload.experiences?.education?.find((p) => p.degree === e.degree),
    })),
    professional: (
      payload.experiences?.professional || candidate!.experiences.professional
    ).map((e) => ({
      ...e,
      ...payload.experiences?.professional?.find(
        (p) => p.company === e.company,
      ),
    })),
  },
  references: (payload.references || candidate!.references).map((r) => ({
    ...r,
    ...payload.references?.find((p) => p.name === r.name),
  })),
  languages: (payload.languages || candidate!.languages).map((l) => ({
    ...l,
    ...payload.languages?.find((p) => p.language === l.language),
  })),
  achievements: (payload.achievements || candidate!.achievements).map((a) => ({
    ...a,
    ...payload.achievements?.find((p) => p.name === a.name),
  })),
})

export const newInstance = (payload: CreateCandidateDto): Candidate => ({
  id: uuid.v4(),
  userId: payload.userId,
  fullName: payload.fullName,
  birthDate: payload.birthDate,
  professionalHeadline: payload.about,
  contact: payload.contact,
  address: payload.address,
  cvUrl: null,
  about: payload.about,
  bannerUrl: null,
  hobbies: payload.hobbies,
  social: payload.social,
  isAvailableForWork: payload.isAvailableForWork,
  allowThirdPartyApplications: payload.allowThirdPartyApplications,
  preferences: payload.preferences,
  experiences: payload.experiences,
  languages: payload.languages,
  references: payload.references,
  achievements: payload.achievements,
})

export const fromDatabase = (model: CandidateModelAttr): Candidate => ({
  id: model.id,
  userId: model.userId,
  fullName: model.fullName,
  birthDate: moment(model.birthDate.toString(), true).format('YYYY-MM-DD'),
  contact: {
    email: model.contactEmail,
    phone: model.contactPhone,
  },
  address: model.address,
  cvUrl: model.cvUrl,
  about: model.about,
  professionalHeadline: model.professionalHeadline,
  bannerUrl: model.bannerUrl,
  hobbies: model.hobbies,
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
  isAvailableForWork: model.isAvailableForWork,
  allowThirdPartyApplications: model.allowThirdPartyApplications,
  preferences: {
    salary: Number(model.salaryPreference),
    contractType: model.contractTypePreference,
    employmentType: model.employmentTypePreference,
    workplaceType: model.workplaceTypePreference,
    benefits: model.benefitsPreference,
    positionLevel: model.positionLevelPreference,
  },
  experiences: {
    education: model.educationalExperiences.map((e) => ({
      degree: e.degree,
      fieldOfStudy: e.fieldOfStudy,
      status: e.status,
      type: e.type,
      institution: e.institution,
      institutionWebsite: e.institutionWebsite,
      description: e.description,
      period: {
        start: {
          year: e.startYear,
          month: e.startMonth,
        },
        end: e.endYear
          ? {
              year: e.endYear,
              month: e.endMonth!,
            }
          : null,
      },
      isCurrent: e.isCurrent,
      semesters: e.semesters,
      currentSemester: e.currentSemester,
      institutionRegistrationNumber: e.institutionRegistrationNumber,
      gradePointAverage: Number(e.gradePointAverage),
      expectedGraduation: e.expectedGraduationYear
        ? {
            year: e.expectedGraduationYear,
            month: e.expectedGraduationMonth!,
          }
        : null,
    })),
    professional: model.professionalExperiences.map((p) => ({
      title: p.title,
      description: p.description,
      company: p.company,
      employmentType: p.employmentType,
      workplaceType: p.workplaceType,
      positionLevel: p.positionLevel,
      isCurrent: p.isCurrent,
      period: {
        start: {
          year: p.startYear,
          month: p.startMonth,
        },
        end: p.isCurrent
          ? null
          : {
              year: p.endYear!,
              month: p.endMonth!,
            },
      },
      location: p.location,
      relatedSkills: p.relatedSkills,
    })),
  },
  references: model.references.map((r) => ({
    name: r.name,
    position: r.position,
    phone: r.phone,
    email: r.email,
    relationship: r.relationship,
    company: r.company,
  })),
  languages: model.languages.map((l) => ({
    language: l.language,
    writtenLevel: l.writtenLevel,
    spokenLevel: l.spokenLevel,
    readingLevel: l.readingLevel,
    listeningLevel: l.listeningLevel,
  })),
  achievements: model.achievements.map((a) => ({
    name: a.name,
    type: a.type,
    issuer: a.issuer,
    issueDate: {
      year: a.issueYear,
      month: a.issueMonth,
    },
    expirationDate:
      a.expirationMonth && a.expirationYear
        ? {
            year: a.expirationYear,
            month: a.expirationMonth,
          }
        : null,
    credentialId: a.credentialId,
    credentialUrl: a.credentialUrl,
    relatedSkills: a.relatedSkills,
  })),
})

export const toDatabase = (
  candidate: Candidate & { userId: string },
): CandidateModelAttr => ({
  id: candidate.id,
  userId: candidate.userId,
  fullName: candidate.fullName,
  birthDate: candidate.birthDate,
  professionalHeadline: candidate.professionalHeadline,
  contactEmail: candidate.contact.email,
  contactPhone: candidate.contact.phone,
  address: candidate.address,
  cvUrl: candidate.cvUrl,
  about: candidate.about,
  bannerUrl: candidate.bannerUrl,
  hobbies: candidate.hobbies,
  linkedin: candidate.social.linkedin,
  github: candidate.social.github,
  twitter: candidate.social.twitter,
  facebook: candidate.social.facebook,
  instagram: candidate.social.instagram,
  youtube: candidate.social.youtube,
  medium: candidate.social.medium,
  website: candidate.social.website,
  isAvailableForWork: candidate.isAvailableForWork,
  allowThirdPartyApplications: candidate.allowThirdPartyApplications,
  salaryPreference: candidate.preferences.salary,
  contractTypePreference: candidate.preferences.contractType,
  employmentTypePreference: candidate.preferences.employmentType,
  workplaceTypePreference: candidate.preferences.workplaceType,
  benefitsPreference: candidate.preferences.benefits,
  positionLevelPreference: candidate.preferences.positionLevel,
  educationalExperiences: candidate.experiences.education.map((education) => ({
    degree: education.degree,
    fieldOfStudy: education.fieldOfStudy,
    status: education.status,
    type: education.type,
    institution: education.institution,
    institutionWebsite: education.institutionWebsite,
    description: education.description,
    startYear: education.period.start.year,
    startMonth: education.period.start.month,
    endYear: education.period.end?.year ?? null,
    endMonth: education.period.end?.month ?? null,
    isCurrent: education.isCurrent,
    semesters: education.semesters,
    currentSemester: education.currentSemester,
    institutionRegistrationNumber: education.institutionRegistrationNumber,
    gradePointAverage: Number(education.gradePointAverage),
    expectedGraduationYear: education.expectedGraduation?.year ?? null,
    expectedGraduationMonth: education.expectedGraduation?.month ?? null,
  })),
  professionalExperiences: candidate.experiences.professional.map(
    (experience) => ({
      title: experience.title,
      description: experience.description,
      company: experience.company,
      employmentType: experience.employmentType,
      workplaceType: experience.workplaceType,
      positionLevel: experience.positionLevel,
      isCurrent: experience.isCurrent,
      startYear: experience.period.start.year,
      startMonth: experience.period.start.month,
      endYear: experience.period.end?.year ?? null,
      endMonth: experience.period.end?.month ?? null,
      location: experience.location,
      relatedSkills: experience.relatedSkills,
    }),
  ),
  references: candidate.references.map((r) => ({
    name: r.name,
    position: r.position,
    phone: r.phone,
    email: r.email,
    relationship: r.relationship,
    company: r.company,
  })),
  languages: candidate.languages.map((l) => ({
    language: l.language,
    writtenLevel: l.writtenLevel,
    spokenLevel: l.spokenLevel,
    readingLevel: l.readingLevel,
    listeningLevel: l.listeningLevel,
  })),
  achievements: candidate.achievements.map((a) => ({
    name: a.name,
    type: a.type,
    issuer: a.issuer,
    issueYear: a.issueDate.year,
    issueMonth: a.issueDate.month,
    expirationYear: a.expirationDate?.year ?? null,
    expirationMonth: a.expirationDate?.month ?? null,
    credentialId: a.credentialId,
    credentialUrl: a.credentialUrl,
    relatedSkills: a.relatedSkills,
  })),
})
