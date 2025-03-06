import { Candidate, CandidateDto, CandidatePayload, newUUID } from '@talent-hub/shared';
import { CandidateModelAttr } from './candidate-model';
import { DbParser } from '@talent-hub/shared/types/db-parser';

type CandidateParser = DbParser<Candidate, CandidateModelAttr> & {
    toDto: (candidate: Candidate) => CandidateDto;

    newInstance: ({ userId, payload }: { userId: string; payload: CandidatePayload }) => Candidate;

    merge: (args: { original: Candidate; changes: CandidatePayload }) => Candidate;
};

export const CandidateParser: CandidateParser = {
    fromDb: ({
        employmentRegimePreference,
        employmentTypePreference,
        workplaceTypePreference,
        benefitsPreference,
        positionLevelPreference,
        contactEmail,
        contactPhone,
        linkedin,
        github,
        website,
        facebook,
        instagram,
        medium,
        twitter,
        youtube,
        salaryExpectation,
        academicBackgrounds,
        professionalExperiences,
        languages,
        references,
        achievements,
        skills,
        ...rest
    }) => ({
        ...rest,
        contact: { email: contactEmail, phone: contactPhone },
        social: {
            linkedin,
            github,
            website,
            facebook,
            instagram,
            medium,
            twitter,
            youtube,
        },
        preferences: {
            employmentRegime: employmentRegimePreference,
            employmentType: employmentTypePreference,
            workplaceType: workplaceTypePreference,
            benefits: benefitsPreference,
            positionLevel: positionLevelPreference,
            salary: salaryExpectation,
        },
        academicBackgrounds: academicBackgrounds.map(
            ({ course, institution, candidateId, periodEnd, periodStart, ...rest }) => ({
                ...rest,
                course,
                institution,
                candidate: { id: candidateId },
                period: { start: periodStart, end: periodEnd },
            }),
        ),
        professionalExperiences: professionalExperiences.map(
            ({ candidateId, periodEnd, periodStart, ...rest }) => ({
                ...rest,
                candidate: { id: candidateId },
                period: { start: periodStart, end: periodEnd },
            }),
        ),
        languages: languages.map(({ candidateId, ...rest }) => ({
            ...rest,
            candidate: { id: candidateId },
        })),
        references: references.map(({ candidateId, contactEmail, contactPhone, ...rest }) => ({
            ...rest,
            candidate: { id: candidateId },
            contact: { email: contactEmail, phone: contactPhone },
        })),
        achievements: achievements.map(({ candidateId, credentialId, credentialUrl, ...rest }) => ({
            ...rest,
            candidate: { id: candidateId },
            credential: { id: credentialId, url: credentialUrl },
        })),
        skills: skills.map(({ candidateId, skill, ...rest }) => ({
            ...rest,
            candidate: { id: candidateId },
            skill,
        })),
    }),

    toDb: ({
        contact,
        social,
        preferences,
        academicBackgrounds,
        professionalExperiences,
        languages,
        references,
        achievements,
        skills,
        ...rest
    }) => ({
        ...rest,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        linkedin: social.linkedin,
        github: social.github,
        website: social.website,
        facebook: social.facebook,
        instagram: social.instagram,
        medium: social.medium,
        twitter: social.twitter,
        youtube: social.youtube,
        salaryExpectation: preferences.salary,
        employmentRegimePreference: preferences.employmentRegime,
        employmentTypePreference: preferences.employmentType,
        workplaceTypePreference: preferences.workplaceType,
        benefitsPreference: preferences.benefits,
        positionLevelPreference: preferences.positionLevel,
        academicBackgrounds: academicBackgrounds.map(
            ({ course, institution, candidate, period, ...rest }) => ({
                ...rest,
                course,
                courseId: course.id,
                institution,
                institutionId: institution.id,
                candidateId: candidate.id,
                periodStart: period.start,
                periodEnd: period.end,
            }),
        ),
        professionalExperiences: professionalExperiences.map(({ candidate, period, ...rest }) => ({
            ...rest,
            candidateId: candidate.id,
            periodStart: period.start,
            periodEnd: period.end,
        })),
        languages: languages.map(({ candidate, ...rest }) => ({
            ...rest,
            candidateId: candidate.id,
        })),
        references: references.map(({ candidate, contact, ...rest }) => ({
            ...rest,
            candidateId: candidate.id,
            contactEmail: contact.email,
            contactPhone: contact.phone,
        })),
        achievements: achievements.map(({ candidate, credential, ...rest }) => ({
            ...rest,
            candidateId: candidate.id,
            credentialId: credential.id,
            credentialUrl: credential.url,
        })),
        skills: skills.map(({ candidate, skill, ...rest }) => ({
            ...rest,
            candidateId: candidate.id,
            skillId: skill.id,
            skill,
        })),
    }),

    toDto: ({ userId, ...dto }) => dto,

    newInstance: ({
        userId,
        payload: {
            academicBackgrounds,
            achievements,
            professionalExperiences,
            references,
            languages,
            skills,
            ...rest
        },
    }) => {
        const candidateId = newUUID();
        return {
            id: candidateId,
            cvUrl: null,
            bannerUrl: null,
            userId,
            ...rest,
            academicBackgrounds: academicBackgrounds.map(
                ({ course, institution, ...academicBackground }) => ({
                    ...academicBackground,
                    id: newUUID(),
                    candidate: {
                        id: candidateId,
                    },
                    course: {
                        id: course.id,
                        name: null,
                        degreeType: null,
                    },
                    institution: {
                        id: institution.id,
                        name: null,
                    },
                }),
            ),
            achievements: achievements.map((achievement) => ({
                ...achievement,
                id: newUUID(),
                candidate: {
                    id: candidateId,
                },
            })),
            professionalExperiences: professionalExperiences.map((professionalExperience) => ({
                ...professionalExperience,
                id: newUUID(),
                candidate: {
                    id: candidateId,
                },
            })),
            references: references.map((reference) => ({
                ...reference,
                id: newUUID(),
                candidate: {
                    id: candidateId,
                },
            })),
            languages: languages.map((language) => ({
                ...language,
                id: newUUID(),
                candidate: {
                    id: candidateId,
                },
            })),
            skills: skills.map(({ skill, ...candidateSkill }) => ({
                ...candidateSkill,
                id: newUUID(),
                candidate: {
                    id: candidateId,
                },
                skill: {
                    id: skill.id,
                    name: null,
                    type: null,
                },
            })),
        };
    },

    merge: ({
        original,
        changes: {
            academicBackgrounds,
            achievements,
            professionalExperiences,
            references,
            languages,
            skills,
            ...changes
        },
    }) => ({
        id: original.id,
        cvUrl: original.cvUrl,
        bannerUrl: original.bannerUrl,
        userId: original.userId,
        ...changes,
        academicBackgrounds: academicBackgrounds.map(
            ({ course, institution, ...academicBackground }) => {
                const existing = original.academicBackgrounds.find(
                    (a) => course.id === a.course.id && a.institution.id === institution.id,
                );

                return existing
                    ? {
                          ...existing,
                          ...academicBackground,
                      }
                    : {
                          ...academicBackground,
                          id: newUUID(),
                          candidate: {
                              id: original.id,
                          },
                          course: {
                              id: course.id,
                              name: null,
                              degreeType: null,
                          },
                          institution: {
                              id: institution.id,
                              name: null,
                          },
                      };
            },
        ),
        achievements: achievements.map((achievement) => {
            const existing = original.achievements.find((a) => a.name === achievement.name);

            return existing
                ? {
                      ...existing,
                      ...achievement,
                  }
                : {
                      ...achievement,
                      id: newUUID(),
                      candidate: {
                          id: original.id,
                      },
                  };
        }),
        professionalExperiences: professionalExperiences.map((professionalExperience) => {
            const existing = original.professionalExperiences.find(
                (pe) =>
                    pe.position === professionalExperience.position &&
                    pe.company === professionalExperience.company,
            );

            return existing
                ? {
                      ...existing,
                      ...professionalExperience,
                  }
                : {
                      ...professionalExperience,
                      id: newUUID(),
                      candidate: {
                          id: original.id,
                      },
                  };
        }),
        references: references.map((reference) => {
            const existing = original.references.find((r) => r.name === reference.name);

            return existing
                ? {
                      ...existing,
                      ...reference,
                  }
                : {
                      ...reference,
                      id: newUUID(),
                      candidate: {
                          id: original.id,
                      },
                  };
        }),
        languages: languages.map((language) => {
            const existing = original.languages.find((l) => l.language === language.language);

            return existing
                ? {
                      ...existing,
                      ...language,
                  }
                : {
                      ...language,
                      id: newUUID(),
                      candidate: {
                          id: original.id,
                      },
                  };
        }),

        skills: skills.map(({ skill, ...candidateSkill }) => {
            const existing = original.skills.find((s) => s.skill.id === skill.id);

            return existing
                ? {
                      ...existing,
                      ...candidateSkill,
                  }
                : {
                      ...candidateSkill,
                      id: newUUID(),
                      candidate: {
                          id: original.id,
                      },
                      skill: {
                          id: skill.id,
                          name: null,
                          type: null,
                      },
                  };
        }),
    }),
};
