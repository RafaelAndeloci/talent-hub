import { AcademicDegreeType } from './academic-degree-type';
import { AcademicStatus } from './academic-status';
import { AchievementType } from './achievement-type';
import { Benefit } from './benefit';
import { EmploymentRegime } from './employment-regime';
import { EmploymentType } from './employment-type';
import { PositionLevel } from './position-level';
import { WorkplaceType } from './workplace-type';
import { Id } from './id';
import { Location } from './location';
import { Address } from './address';
import { Contact } from './contact';
import { Period } from './period';
import { LanguageProfile } from './language-profile';
import { RelatedWebsites } from './related-websites';
import { YearMonth } from './year-month';

export interface CandidateReference {
    name: string;
    position: string;
    phone: string;
    email: string;
    relationship: string;
    company: string | null;
}

export interface CandidateProfessionalExperience {
    position: string;
    description: string | null;
    company: string;
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    positionLevel: PositionLevel;
    isCurrent: boolean;
    period: Period;
    location: Location;
    relatedSkills: string[];
    responsibilities: string[];
}

export interface CandidateAchievement {
    name: string;
    type: AchievementType;
    issuer: string;
    workload: number | null;
    issueDate: Date;
    expirationDate: Date | null;
    credentialId: string | null;
    credentialUrl: string | null;
    relatedSkills: string[];
}

export interface CandidateEducationalExperience {
    degree: string;
    fieldOfStudy: string;
    type: AcademicDegreeType;
    institution: string;
    institutionWebsite: string | null;
    description: string | null;
    period: Period;
    isCurrent: boolean;
    status: AcademicStatus;
    semesters: number | null;
    currentSemester: number | null;
    institutionRegistrationNumber: string | null;
    gradePointAverage: number | null;
    expectedGraduation: YearMonth | null;
}

export interface CandidateExperiences {
    education: CandidateEducationalExperience[];
    professional: CandidateProfessionalExperience[];
}

export interface CandidatePreferences {
    salary: number | null;
    employmentRegime: EmploymentRegime | null;
    employmentType: EmploymentType | null;
    workplaceType: WorkplaceType | null;
    benefits: Benefit[];
    positionLevel: PositionLevel | null;
}

export interface Candidate extends Id {
    userId: string;
    fullName: string;
    birthDate: string;
    professionalHeadline: string | null;
    contact: Contact;
    address: Address;
    cvUrl: string | null;
    about: string | null;
    bannerUrl: string | null;
    hobbies: string[];
    social: RelatedWebsites;
    isAvailableForWork: boolean;
    allowThirdPartyApplications: boolean;
    preferences: CandidatePreferences;
    experiences: CandidateExperiences;
    languages: LanguageProfile[];
    references: CandidateReference[];
    achievements: CandidateAchievement[];
}
