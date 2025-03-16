import { DbParser, JobOpening, JobOpeningPayload, newUUID } from '@talent-hub/shared';
import { JobOpeningModelAttr } from './job-opening-model';

type JobOpeningParser = DbParser<JobOpening, JobOpeningModelAttr> & {
    newInstance: (args: { payload: JobOpeningPayload }) => JobOpening;
};

export const JobOpeningParser: JobOpeningParser = {
    fromDb: ({
        customBenefits,
        fixedBenefits,
        desiredCourses,
        desiredGradePointAverageMin,
        desiredLanguages,
        desiredMinimumEducationLevel,
        desiredYearsOfExperience,
        desiredCertifications,
        desiredSkills,
        companyId,
        companyTradeName,
        salaryMax,
        salaryMin,
        ...rest
    }) => ({
        ...rest,
        company: {
            id: companyId,
            tradeName: companyTradeName,
        },
        salaryRange:
            salaryMax && salaryMin
                ? {
                      min: salaryMin,
                      max: salaryMax,
                  }
                : null,
        benefits: {
            fixed: fixedBenefits,
            custom: customBenefits,
        },
        profile: {
            certifications: desiredCertifications,
            yearsOfExperience: desiredYearsOfExperience,
            minimumEducationLevel: desiredMinimumEducationLevel,
            gradePointAverageMin: desiredGradePointAverageMin,
            languages: desiredLanguages.map(({ id, ...rest }) => rest),
            courses: desiredCourses.map(
                ({ couseName, courseId, semestreMax, semestreMin, ...desiredCourse }) => ({
                    ...desiredCourse,
                    course: {
                        id: courseId,
                        name: couseName,
                    },
                    semestreRange: {
                        min: semestreMin,
                        max: semestreMax,
                    },
                }),
            ),
            skills: desiredSkills.map(({ skillId, skillName, skillType, ...rest }) => ({
                ...rest,
                skill: {
                    id: skillId,
                    name: skillName,
                    type: skillType,
                },
            })),
        },
    }),

    toDb: ({
        company: { id: companyId, tradeName: companyTradeName },
        salaryRange,
        benefits: { custom: customBenefits, fixed: fixedBenefits },
        profile: {
            certifications: desiredCertifications,
            yearsOfExperience: desiredYearsOfExperience,
            minimumEducationLevel: desiredMinimumEducationLevel,
            gradePointAverageMin: desiredGradePointAverageMin,
            languages,
            courses,
            skills,
        },
        ...rest
    }) => ({
        ...rest,
        companyTradeName,
        companyId,
        salaryMax: salaryRange?.max ?? null,
        salaryMin: salaryRange?.min ?? null,
        customBenefits,
        fixedBenefits,
        desiredCertifications,
        desiredYearsOfExperience,
        desiredMinimumEducationLevel,
        desiredGradePointAverageMin,
        desiredLanguages: languages.map((l) => ({
            id: newUUID(),
            jobOpeningId: rest.id,
            ...l,
        })),
        desiredCourses: courses.map(({ course, semestreRange, ...c }) => ({
            id: newUUID(),
            jobOpeningId: rest.id,
            ...c,
            courseId: course.id,
            couseName: course.name,
            semestreMax: semestreRange.max,
            semestreMin: semestreRange.min,
        })),
        desiredSkills: skills.map(({ skill, ...s }) => ({
            ...s,
            jobOpeningId: rest.id,
            id: newUUID(),
            skillId: skill.id,
            skillName: skill.name,
            skillType: skill.type,
        })),
    }),

    newInstance: ({ payload }) => ({
        ...payload,
        id: newUUID(),
    }),
};
