import { Benefit } from '../../candidates/types/enums/benefit';
import { ContractType } from '../../candidates/types/enums/contract-type';
import { EmploymentType } from '../../candidates/types/enums/employment-type';
import { PositionLevel } from '../../candidates/types/enums/position-level';
import { WorkplaceType } from '../../candidates/types/enums/workplace-type';
import { JobOpeningStatus } from './enums/job-opening-status';

export interface JobOpeningModelAttr {
    id: string;
    title: string;
    selectedApplicationId: string | null;
    status: JobOpeningStatus;
    companyId: string;
    description: string;
    positionLevel: PositionLevel;
    workplaceType: WorkplaceType;
    employmentType: EmploymentType;
    salary: number;
    contractType: ContractType;
    benefits: Benefit[];
    deadline: Date;
    responsibilities: string[];
    requirements: string[];
}
