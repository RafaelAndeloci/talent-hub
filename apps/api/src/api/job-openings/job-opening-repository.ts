import { Op } from 'sequelize';
import { makeRepository } from '../../services/repository';
import { JobOpeningModel, JobOpeningModelAttr } from './job-opening-model';
import { JobOpening } from './types/job-opening';
import { JobOpeningStatus } from './types/enums/job-opening-status';

export const jobOpeningRepositoryBase = makeRepository<
    JobOpening,
    JobOpeningModelAttr,
    JobOpeningModel
>({
    model: JobOpeningModel,
    toDatabase: jobOpening => jobOpening as JobOpeningModelAttr,
    fromDatabase: jobOpening => jobOpening,
});

export const jobOpeningRepository = {
    ...jobOpeningRepositoryBase,

    async existsByTitle({
        title,
        companyId,
    }: {
        title: string;
        companyId: string;
    }): Promise<boolean> {
        return await jobOpeningRepositoryBase.exists({
            [Op.and]: [
                { companyId },
                { title },
                {
                    status: {
                        [Op.not]: [JobOpeningStatus.closed, JobOpeningStatus.filled],
                    },
                },
            ],
        });
    },
};
