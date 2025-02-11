import { AcademicDegreeType } from './academic-degree-type';
import { Benefit } from './benefit';
import { EmploymentRegime } from './employment-regime';
import { EmploymentType } from './employment-type';
import { Id } from './id';
import { JobOpeningStatus } from './job-opening-status';
import { LanguageProfile } from './language-profile';
import { PositionLevel } from './position-level';
import { SallaryRange } from './sallary-range';
import { SkillProfile } from './skill-profile';
import { WorkplaceType } from './workplace-type';

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
