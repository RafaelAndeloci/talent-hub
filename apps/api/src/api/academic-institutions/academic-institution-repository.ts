import { makeRepository } from '../../services/repository';
import { AcademicInstitution } from '@talent-hub/shared';
import { AcademicInstitutionModel } from './academic-institution-model';
import { AcademicInstitutionParser } from './academic-institution-parser';
import { AcademicInstitutionModelAttr } from '../../types/academic-institution-model-attr';

export const academicInstitutionRepository = makeRepository<
    AcademicInstitution,
    AcademicInstitutionModelAttr,
    AcademicInstitutionModel
>({
    model: AcademicInstitutionModel,
    toDatabase: AcademicInstitutionParser.toDatabase,
    fromDatabase: AcademicInstitutionParser.fromDatabase,
});
