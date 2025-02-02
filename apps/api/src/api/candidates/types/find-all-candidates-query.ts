import { FindAllArgs } from '../../../types/find-all-args';
import { CandidateDto } from './candidate-dto';

export type FindAllCandidatesQuery = FindAllArgs<
    CandidateDto & {
        contactEmail: string;
        contactPhone: string;
        ['address.zipCode']: string;
        salaryPreference: number;
        contractTypePreference: string;
        employmentTypePreference: string;
        workplaceTypePreference: string;
        positionLevelPreference: string;
    }
>;