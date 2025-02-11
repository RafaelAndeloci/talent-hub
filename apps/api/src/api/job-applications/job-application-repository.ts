import { JobApplication } from '@talent-hub/shared';
import { makeRepository } from '../../services/repository';
import { JobApplicationModelAttr } from '../../types/job-application-model-attr';
import { JobApplicationModel } from './job-application-model';
import { jobApplicationParser } from './job-application-parser';

export const jobApplicationRepository = makeRepository<
    JobApplication,
    JobApplicationModelAttr,
    JobApplicationModel
>({
    model: JobApplicationModel,
    toDatabase: jobApplicationParser.toDatabase,
    fromDatabase: jobApplicationParser.fromDatabase,
});
