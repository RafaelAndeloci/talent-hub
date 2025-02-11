import { JobOpening, Role, JobOpeningDto, CreateJobOpeningPayload } from '@talent-hub/shared/types';
import { JobOpeningModelAttr } from './job-opening-model-attr';

export type JobOpeningParser = {
    toDto: (args: { jobOpening: JobOpening; role: Role }) => JobOpeningDto;

    newInstance: (args: { payload: CreateJobOpeningPayload }) => JobOpening;

    fromDatabase: (jobOpening: JobOpeningModelAttr) => JobOpening;

    toDatabase: (jobOpening: JobOpening) => JobOpeningModelAttr;
};
