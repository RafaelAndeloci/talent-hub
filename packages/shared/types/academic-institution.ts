import { AcademicDegreeType } from "./academic-degree-type";
import { Id } from "./id";
import { SuggestionStatus } from "./suggestion-status";
import { Validation } from "./validation";

export interface AcademicInstitution extends Id {
    name: string;
    city: string;
    website: string;
    status: SuggestionStatus;
    validation: Validation | null;
    offeredDegreeTypes: AcademicDegreeType[];
}