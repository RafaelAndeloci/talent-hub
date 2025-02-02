import { makeRepository } from '../../services/repository';
import { JobApplicationModel } from './job-application-model';
import { jobApplicationParser } from './job-application-parser';
import { JobApplication } from './types/job-application';
import { JobApplicationModelAttr } from './types/job-application-model-attr';

export const jobApplicationRepository = makeRepository<
    JobApplication,
    JobApplicationModelAttr,
    JobApplicationModel
>({
    model: JobApplicationModel,
    toDatabase: jobApplicationParser.toDatabase,
    fromDatabase: jobApplicationParser.fromDatabase,
});
