import { AcademicInstitution } from '@talent-hub/shared';
import { Repository } from '../../services/repository';
import {
    AcademicInstitutionModel,
    AcademicInstitutionModelAttr,
} from './academic-institution-model';
import { AcademicInstitutionParser } from './academic-institution-parser';

export default class AcademicInstitutionRepository extends Repository<
    AcademicInstitution,
    AcademicInstitutionModelAttr,
    AcademicInstitutionModel
> {
    constructor() {
        super(AcademicInstitutionModel, AcademicInstitutionParser);
    }
}
