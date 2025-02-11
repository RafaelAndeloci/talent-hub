import { EmploymentType, PositionLevel, WorkplaceType, Location } from '@talent-hub/shared/types';

export interface CandidateProfessionalExperienceModelAttr {
    id?: string;
    candidateId?: string;
    position: string;
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
    location: Location;
    relatedSkills: string[];
    responsibilities: string[];
}
