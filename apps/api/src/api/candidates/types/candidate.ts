import { Id } from '../../../types/id';
import { Period } from '../../../types/period';
import { RelatedWebsites } from '../../../types/related-websites';
import { YearMonth } from '../../../types/year-month';
import { AcademicDegreeType } from './enums/academic-degree-type';
import { AcademicStatus } from './enums/academic-status';
import { Benefit } from './enums/benefit';
import { ContractType } from './enums/contract-type';
import { EmploymentType } from './enums/employment-type';
import { PositionLevel } from './enums/position-level';
import { WorkplaceType } from './enums/workplace-type';
import { Language } from '../../../enums/language';
import { LanguageProficiency } from './enums/language-proficiency';
import { Contact } from '../../../types/contact';
import { Address } from '../../../types/address';

export interface CandidateReference {
    name: string;
    position: string;
    phone: string;
    email: string;
    relationship: string;
    company: string | null;
}

export interface CandidateProfessionalExperience {
    title: string;
    description: string | null;
    company: string;
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    positionLevel: PositionLevel;
    isCurrent: boolean;
    period: Period;
    // TODO: Define Location type
    location: object | null;
    relatedSkills: string[];
}

export interface CandidateLanguage {
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}

export interface CandidateAchievement {
    name: string;
    type: string;
    issuer: string;
    issueDate: YearMonth;
    expirationDate: YearMonth | null;
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
    contractType: ContractType | null;
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
    languages: CandidateLanguage[];
    references: CandidateReference[];
    achievements: CandidateAchievement[];
}
