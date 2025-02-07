import * as uuid from 'uuid';
import moment from 'moment';

import { CandidateParser } from './types/candidate-parse';
import _ from 'lodash';

export const candidateParser: CandidateParser = {
    toDatabase: (candidate) => ({
        ...candidate,
        contactEmail: candidate.contact.email,
        contactPhone: candidate.contact.phone,
        ...candidate.social,
        salaryPreference: candidate.preferences.salary,
        employmentRegimePreference: candidate.preferences.employmentRegime,
        employmentTypePreference: candidate.preferences.employmentType,
        workplaceTypePreference: candidate.preferences.workplaceType,
        benefitsPreference: candidate.preferences.benefits,
        positionLevelPreference: candidate.preferences.positionLevel,
        educationalExperiences: candidate.experiences.education.map((education) => ({
            ...education,
            startYear: education.period.start.year,
            startMonth: education.period.start.month,
            endYear: education.period.end?.year ?? null,
            endMonth: education.period.end?.month ?? null,
            gradePointAverage: Number(education.gradePointAverage),
            expectedGraduationYear: education.expectedGraduation?.year ?? null,
            expectedGraduationMonth: education.expectedGraduation?.month ?? null,
        })),
        professionalExperiences: candidate.experiences.professional.map((experience) => ({
            ...experience,
            startYear: experience.period.start.year,
            startMonth: experience.period.start.month,
            endYear: experience.period.end?.year ?? null,
            endMonth: experience.period.end?.month ?? null,
        })),
    }),

    fromDatabase: (model) => ({
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
            employmentRegime: model.employmentRegimePreference,
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
                position: p.position,
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
                responsibilities: p.responsibilities,
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
            issueDate: a.issueDate,
            workload: a.workload,
            expirationDate: a.expirationDate,
            credentialId: a.credentialId,
            credentialUrl: a.credentialUrl,
            relatedSkills: a.relatedSkills,
        })),
    }),

    newInstance: ({ userId, payload }) => ({
        id: uuid.v4(),
        userId,
        fullName: payload.fullName,
        birthDate: payload.birthDate,
        professionalHeadline: payload.professionalHeadline,
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
    }),

    toDto: ({ candidate }) => _.omit(candidate, 'userId'),
};
