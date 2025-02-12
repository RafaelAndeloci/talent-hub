import { AcademicInstitution } from '@talent-hub/shared';

export type AcademicInstitutionModelAttr = Omit<AcademicInstitution, 'validation'> & {
    validatedBy: string | null;
    validatedAt: Date | null;
};
