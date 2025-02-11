import { AcademicDegreeType, AcademicStatus } from '@talent-hub/shared';

export interface CandidateEducationalExperienceModelAttr {
    id?: string;
    candidateId?: string;
    degree: string;
    fieldOfStudy: string;
    status: AcademicStatus;
    type: AcademicDegreeType;
    institution: string;
    institutionWebsite: string | null;
    description: string | null;
    startYear: number;
    startMonth: number;
    endYear: number | null;
    endMonth: number | null;
    isCurrent: boolean;
    semesters: number | null;
    currentSemester: number | null;
    institutionRegistrationNumber: string | null;
    gradePointAverage: number | null;
    expectedGraduationYear: number | null;
    expectedGraduationMonth: number | null;
}
