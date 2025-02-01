import { FindAllArgs } from '../../../types/find-all-args';
import { Candidate } from './candidate';

export type FindAllCandidatesQuery = FindAllArgs<
    Candidate & {
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
