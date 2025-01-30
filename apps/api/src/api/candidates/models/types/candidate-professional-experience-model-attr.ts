import { EmploymentType } from '../../types/enums/employment-type';
import { PositionLevel } from '../../types/enums/position-level';
import { WorkplaceType } from '../../types/enums/workplace-type';

export interface CandidateProfessionalExperienceModelAttr {
    id?: string;
    candidateId?: string;
    title: string;
    description: string | null;
    company: string;
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    positionLevel: PositionLevel;
    isCurrent: boolean;
    startYear: number;
    startMonth: number;
    endYear: number | null;
    endMonth: number | null;
    location: object | null;
    relatedSkills: string[];
}
