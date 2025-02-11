import { CreateJobApplicationPayload, UserDto, JobApplication } from '@talent-hub/shared';
import { JobApplicationModelAttr } from './job-application-model-attr';

export type JobApplicationParser = {
    newInstance: (args: { payload: CreateJobApplicationPayload; user: UserDto }) => JobApplication;
    fromDatabase: (model: JobApplicationModelAttr) => JobApplication;
    toDatabase: (entity: JobApplication) => JobApplicationModelAttr;
};
