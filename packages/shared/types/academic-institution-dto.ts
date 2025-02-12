import { AcademicInstitution } from "./academic-institution";

export type AcademicInstitutionDto = Omit<AcademicInstitution, 'validation'>;