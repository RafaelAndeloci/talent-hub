import { UserDto } from '../../users/types/user-dto';
import { JobApplicationModelAttr } from '../job-application-model';
import { CreateJobApplicationPayload } from './create-job-application-payload';
import { JobApplication } from './job-application';

export type JobApplicationParser = {
    newInstance: (args: { payload: CreateJobApplicationPayload; user: UserDto }) => JobApplication;
    fromDatabase: (model: JobApplicationModelAttr) => JobApplication;
    toDatabase: (entity: JobApplication) => JobApplicationModelAttr;
};
