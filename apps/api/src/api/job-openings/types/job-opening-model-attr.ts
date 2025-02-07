import { LanguageProfile } from '../../../types/language-profile';
import { SkillModelAttr } from '../../skills/types/skill-model-attr copy';
import { JobOpening, JobOpeningSkillProfile } from './job-opening';

export type JobOpeningSkillProfileModelAttr = Omit<
    JobOpeningSkillProfile,
    'skillName' | 'skillType'
> & {
    id?: string;
    skill?: SkillModelAttr;
};

export type JobOpeningModelAttr = Omit<JobOpening, 'salary' | 'profile'> & {
    minimumSalary: number | null;
    maximumSalary: number | null;
    yearsOfExperience: number;
    minimumEducationLevel?: string;
    gradePointAvaregeMin?: number;
    //TODO: CREATE COURSE MODEL
    courses: string[];
    languages: LanguageProfile[];
    // TODO: create certification model to store certification data
    certifications: string[];
};
