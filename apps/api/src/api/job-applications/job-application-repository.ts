import { JobApplication } from '@talent-hub/shared';
import { JobApplicationModel, JobApplicationModelAttr } from './job-application-model';
import { jobApplicationParser } from './job-application-parser';
import { Repository } from '../../services/repository';

export class JobApplicationRepository extends Repository<
    JobApplication,
    JobApplicationModelAttr,
    JobApplicationModel
> {
    constructor() {
        super(JobApplicationModel, jobApplicationParser);
    }

    public async findJobOpenningApplications(jobOpeningId: string): Promise<JobApplication[]> {
        const models = await JobApplicationModel.findAll({
            where: {
                jobOpeningId,
            },
        });

        return models.map((model) => jobApplicationParser.fromDb(model.toJSON()));
    }
}
