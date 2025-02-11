import { CandidateDto } from './candidate-dto';
import { FindAllArgs } from './find-all-args';

export type FindAllCandidatesQuery = CandidateDto & {
    contactEmail: string;
    contactPhone: string;
    ['address.zipCode']: string;
    salaryPreference: number;
    contractTypePreference: string;
    employmentTypePreference: string;
    workplaceTypePreference: string;
    positionLevelPreference: string;
};

export type FindAllCandidatesQueryArgs = FindAllArgs<FindAllCandidatesQuery>;
