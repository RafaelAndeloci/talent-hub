import { JobOpeningRepository } from './job-opening-repository';
import ApiError from '../../utils/api-error';
import {
    FillJobOpeningPayload,
    JobApplicationStatus,
    JobOpening,
    JobOpeningPayload,
    JobOpeningStatus,
    QueryArgs,
} from '@talent-hub/shared';
import { JobOpeningParser } from './job-opening-parser';
import { JobQueueService } from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import { JobApplicationRepository } from '../job-applications/job-application-repository';

export class JobOpeningBusiness {
    constructor(
        private readonly jobOpeningRepository = new JobOpeningRepository(),
        private readonly jobApplicationRepository = new JobApplicationRepository(),
    ) {}

    async findById({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        return jobOpening;
    }

    async findAll({ query }: { query: QueryArgs<JobOpening> }) {
        return this.jobOpeningRepository.findAll(query);
    }

    async create({ payload }: { payload: JobOpeningPayload }) {
        const alreadyExists = await this.jobOpeningRepository.existsByPosition({
            position: payload.position,
            companyId: payload.company.id,
        });
        if (alreadyExists) {
            ApiError.throwBadRequest(
                `job opening with position ${payload.position} already exists`,
            );
        }

        const jobOpening = JobOpeningParser.newInstance({ payload });
        await this.jobOpeningRepository.create({ entity: jobOpening });

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningCreated,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpening;
    }

    async update({ jobOpeningId, payload }: { jobOpeningId: string; payload: JobOpeningPayload }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        if (jobOpening.position !== payload.position) {
            const alreadyExists = await this.jobOpeningRepository.existsByPosition({
                position: payload.position,
                companyId: jobOpening.company.id,
            });
            if (alreadyExists) {
                ApiError.throwBadRequest(
                    `job opening with position ${payload.position} already exists`,
                );
            }
        }

        const updatedJobOpening = { ...jobOpening, ...payload };
        await this.jobOpeningRepository.update({ entity: updatedJobOpening });

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningUpdated,
            payload: {
                jobOpeningId: updatedJobOpening.id,
            },
        });

        return updatedJobOpening;
    }

    async close({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        if (!this.canBeClosed({ jobOpening })) {
            ApiError.throwBadRequest('job opening cannot be closed');
        }

        jobOpening.status = JobOpeningStatus.Closed;

        await this.jobOpeningRepository.update({ entity: jobOpening });

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningClosed,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpening;
    }

    async open({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        if (jobOpening.status !== JobOpeningStatus.Draft) {
            ApiError.throwBadRequest('job opening cannot be opened');
        }

        jobOpening.status = JobOpeningStatus.Open;

        await this.jobOpeningRepository.update({ entity: jobOpening });

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningOpened,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpening;
    }

    async fill({
        jobOpeningId,
        payload,
    }: {
        jobOpeningId: string;
        payload: FillJobOpeningPayload;
    }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        if (jobOpening.status !== JobOpeningStatus.Open) {
            ApiError.throwBadRequest('job opening cannot be filled');
        }

        jobOpening.status = JobOpeningStatus.Filled;
        jobOpening.selectedApplicationId = payload.selectedApplicationId;

        await this.jobOpeningRepository.update({ entity: jobOpening });

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningFilled,
            payload: {
                jobOpeningId: jobOpening.id,
                selectedJobApplicationId: payload.selectedApplicationId,
            },
        });

        return jobOpening;
    }

    async toDraft({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        if (jobOpening.status !== JobOpeningStatus.Open) {
            ApiError.throwBadRequest('job opening cannot be set to draft');
        }

        const applications =
            await this.jobApplicationRepository.findJobOpenningApplications(jobOpeningId);
        if (applications.some((app) => app.status === JobApplicationStatus.waiting)) {
            ApiError.throwBadRequest(
                'job opening cannot be set to draft. There are pending applications. To set to draft, all applications must be reject all applications or delete them',
            );
        }

        jobOpening.status = JobOpeningStatus.Draft;

        await this.jobOpeningRepository.update({ entity: jobOpening });

        return jobOpening;
    }

    async remove({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        await JobQueueService.enqueue({
            event: AppEvent.JobOpeningRemoved,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        await this.jobOpeningRepository.deleteById({ id: jobOpeningId });
    }

    async validateForApplication({ jobOpeningId }: { jobOpeningId: string }) {
        const jobOpening = await this.jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
        }

        const acceptNewApplications = jobOpening.status === JobOpeningStatus.Open;
        if (!acceptNewApplications) {
            ApiError.throwUnprocessableEntity(
                `job opening ${jobOpeningId} is not accepting applications`,
            );
        }

        return jobOpening;
    }

    private canBeClosed({ jobOpening }: { jobOpening: JobOpening }) {
        const closableStatuses: JobOpeningStatus[] = [
            JobOpeningStatus.Open,
            JobOpeningStatus.Draft,
        ];
        return closableStatuses.includes(jobOpening.status);
    }
}
