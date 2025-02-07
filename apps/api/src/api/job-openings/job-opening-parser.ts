import _ from 'lodash';
import * as uuid from 'uuid';

import { JobOpeningParser } from './types/job-opening-parser';
import { Role } from '../users/types/enums/role';
import { JobOpeningStatus } from './types/enums/job-opening-status';
import { SallaryRange } from '../../types/sallary-range';
import { JobOpeningSkillProfileModelAttr } from './types/job-opening-model-attr';

export const jobOpeningParser: JobOpeningParser = {
    toDto: ({ jobOpening, role }) =>
        role === Role.candidate ? _.omit(jobOpening, ['selectedApplicationId']) : jobOpening,

    newInstance: ({ payload }) => ({
        id: uuid.v4(),
        position: payload.position,
        description: payload.description,
        status: JobOpeningStatus.draft,
        companyId: payload.companyId,
        selectedApplicationId: null,
        positionLevel: payload.positionLevel,
        workplaceType: payload.workplaceType,
        employmentType: payload.employmentType,
        salary: payload.salary,
        employmentRegime: payload.employmentRegime,
        benefits: payload.benefits,
        deadline: payload.deadline,
        responsibilities: payload.responsibilities,
        profile: payload.profile,
        requirements: payload.requirements,
    }),

    toDatabase: (jobOpening) => ({
        id: jobOpening.id,
        position: jobOpening.position,
        description: jobOpening.description,
        status: jobOpening.status,
        companyId: jobOpening.companyId,
        selectedApplicationId: jobOpening.selectedApplicationId,
        positionLevel: jobOpening.positionLevel,
        workplaceType: jobOpening.workplaceType,
        employmentType: jobOpening.employmentType,
        employmentRegime: jobOpening.employmentRegime,
        benefits: jobOpening.benefits,
        deadline: jobOpening.deadline,
        responsibilities: jobOpening.responsibilities,
        yearsOfExperience: jobOpening.profile?.yearsOfExperience ?? 0,
        minimumSalary: jobOpening.salary?.min ?? null,
        languages: jobOpening.profile?.languages ?? [],
        maximumSalary: jobOpening.salary?.max ?? null,
        certifications: jobOpening.profile?.certifications ?? [],
        courses: jobOpening.profile?.courses ?? [],
        skills:
            jobOpening.profile?.skills.map((skill) => ({
                skillId: skill.skillId,
                proficiencyLevel: skill.proficiencyLevel,
                mandatory: skill.mandatory,
            })) ?? [],
        minimumEducationLevel: jobOpening.profile?.minimumEducationLevel,
        gradePointAvaregeMin: jobOpening.profile?.gradePointAvaregeMin,
        requirements: jobOpening.requirements,
    }),

    fromDatabase: (jobOpening) => ({
        id: jobOpening.id,
        position: jobOpening.position,
        description: jobOpening.description,
        status: jobOpening.status,
        companyId: jobOpening.companyId,
        selectedApplicationId: jobOpening.selectedApplicationId,
        positionLevel: jobOpening.positionLevel,
        workplaceType: jobOpening.workplaceType,
        employmentType: jobOpening.employmentType,
        salary: jobOpening.minimumSalary
            ? ({
                  min: jobOpening.minimumSalary,
                  max: jobOpening.maximumSalary,
              } as SallaryRange)
            : null,
        employmentRegime: jobOpening.employmentRegime,
        benefits: jobOpening.benefits,
        deadline: jobOpening.deadline,
        responsibilities: jobOpening.responsibilities,
        requirements: jobOpening.requirements,
        profile: {
            yearsOfExperience: jobOpening.yearsOfExperience,
            skills: (jobOpening as any).skills.map(
                (skillProfile: JobOpeningSkillProfileModelAttr) => ({
                    skillId: skillProfile.skill!.id,
                    skillName: skillProfile.skill!.name,
                    skillType: skillProfile.skill!.type,
                    mandatory: skillProfile.mandatory,
                    proficiencyLevel: skillProfile.proficiencyLevel,
                }),
            ),
            courses: jobOpening.courses,
            languages: jobOpening.languages,
            certifications: jobOpening.certifications,
        },
    }),
};
