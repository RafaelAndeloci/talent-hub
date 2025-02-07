import { Id } from '../../../types/id';
import { LanguageProfile } from '../../../types/language-profile';
import { SallaryRange } from '../../../types/sallary-range';
import { SkillProfile } from '../../../types/skill-profile';
import { AcademicDegreeType } from '../../candidates/types/enums/academic-degree-type';
import { Benefit } from '../../candidates/types/enums/benefit';
import { EmploymentRegime } from '../../candidates/types/enums/employment-regime';
import { EmploymentType } from '../../candidates/types/enums/employment-type';
import { PositionLevel } from '../../candidates/types/enums/position-level';
import { WorkplaceType } from '../../candidates/types/enums/workplace-type';
import { JobOpeningStatus } from './enums/job-opening-status';

export interface JobOpeningSkillProfile extends SkillProfile {
    mandatory: boolean;
}

export interface JobOpeningProfile {
    yearsOfExperience: number;
    skills: JobOpeningSkillProfile[];
    minimumEducationLevel?: AcademicDegreeType;
    gradePointAvaregeMin?: number;
    courses: string[];
    languages: LanguageProfile[];
    certifications: string[];
}

export interface Requirement {
    description: string;
    mandatory: boolean;
}

export interface JobOpening extends Id {
    position: string;
    description: string;
    status: JobOpeningStatus;
    companyId: string;
    selectedApplicationId: string | null;
    positionLevel: PositionLevel;
    workplaceType: WorkplaceType;
    employmentType: EmploymentType;
    salary: SallaryRange | null;
    employmentRegime: EmploymentRegime;
    benefits: Benefit[];
    deadline: Date;
    responsibilities: string[];
    requirements: Requirement[];
    profile: JobOpeningProfile;
}
