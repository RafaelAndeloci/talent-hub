import { AcademicInstitutionDto } from './academic-institution-dto';

export type CreateAcademicInstitutionPayload = Omit<AcademicInstitutionDto, 'id' | 'status'>;
