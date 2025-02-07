import { Op } from 'sequelize';
import { makeRepository } from '../../services/repository';
import { JobOpeningModel } from './job-opening-model';
import { JobOpening } from './types/job-opening';
import { JobOpeningStatus } from './types/enums/job-opening-status';
import { JobOpeningModelAttr } from './types/job-opening-model-attr';
import { jobOpeningParser } from './job-opening-parser';

export const jobOpeningRepositoryBase = makeRepository<
    JobOpening,
    JobOpeningModelAttr,
    JobOpeningModel
>({
    model: JobOpeningModel,
    toDatabase: jobOpeningParser.toDatabase,
    fromDatabase: jobOpeningParser.fromDatabase,
});

export const jobOpeningRepository = {
    ...jobOpeningRepositoryBase,
    existsByPosition: async ({
        position,
        companyId,
    }: {
        position: string;
        companyId: string;
    }): Promise<boolean> => {
        return await jobOpeningRepositoryBase.exists({
            [Op.and]: [
                { companyId },
                { position },
                {
                    status: {
                        [Op.not]: [JobOpeningStatus.closed, JobOpeningStatus.filled],
                    },
                },
            ],
        });
    },
};
