import { AcademicDegreeType } from './academic-degree-type';
import { Id } from './id';
import { SuggestionStatus } from './suggestion-status';
import { Validation } from './validation';

export interface Course extends Id {
    name: string;
    field: string;
    degreeType: AcademicDegreeType;
    institution: {
        id: string;
        name?: string;
    };
    status: SuggestionStatus;
    validation: Validation | null;
}
