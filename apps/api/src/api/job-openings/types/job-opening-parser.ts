import { Role } from '../../users/types/enums/role';
import { CreateJobOpeningPayload } from './create-job-opening-payload';
import { JobOpening } from './job-opening';
import { JobOpeningDto } from './job-opening-dto';

export type JobOpeningParser = {
    toDto: (args: { jobOpening: JobOpening; role: Role }) => JobOpeningDto;

    newInstance: (args: { payload: CreateJobOpeningPayload }) => JobOpening;
};
