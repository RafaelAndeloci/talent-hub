import { Role } from '../../users/types/enums/role';
import { CreateJobOpeningPayload } from './create-job-opening-payload';
import { JobOpening } from './job-opening';
import { JobOpeningDto } from './job-opening-dto';
import { JobOpeningModelAttr } from './job-opening-model-attr';

export type JobOpeningParser = {
    toDto: (args: { jobOpening: JobOpening; role: Role }) => JobOpeningDto;

    newInstance: (args: { payload: CreateJobOpeningPayload }) => JobOpening;

    fromDatabase: (jobOpening: JobOpeningModelAttr) => JobOpening;

    toDatabase: (jobOpening: JobOpening) => JobOpeningModelAttr;
};
