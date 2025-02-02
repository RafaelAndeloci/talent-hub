import { jobOpeningRepository } from './job-opening-repository';
import { companyRepository } from '../companies/company-repository';
import { ApiError } from '../../types/api-error';
import { JobOpeningStatus } from './types/enums/job-opening-status';
import { jobQueueService } from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import { jobApplicationRepository } from '../job-applications/job-application-repository';
import { JobApplicationStatus } from '../job-applications/types/enums/job-application-status';
import { JobOpeningBusiness } from './types/job-opening-business';
import { jobOpeningParser } from './job-opening-parser';
import _ from 'lodash';

export const jobOpeningBusiness: JobOpeningBusiness = {
    findById: async ({ jobOpeningId, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            throw new Error(`job opening with id ${jobOpeningId} not found`);
        }

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    findAll: async ({ query, context }) => {
        const jobOpenings = await jobOpeningRepository.findAll(query);

        return jobOpenings.parse((jobOpening) =>
            jobOpeningParser.toDto({ jobOpening, role: context.user.role }),
        );
    },

    create: async ({ payload, context }) => {
        const company = await companyRepository.findById(payload.companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${payload.companyId} not found`);
        }

        const alreadyExists = await jobOpeningRepository.existsByTitle({
            title: payload.title,
            companyId: payload.companyId,
        });
        if (alreadyExists) {
            ApiError.throwBadRequest(`job opening with title ${payload.title} already exists`);
        }

        const jobOpening = jobOpeningParser.newInstance({ payload });
        await jobOpeningRepository.create(jobOpening);

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningCreated,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    update: async ({ jobOpeningId, payload, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        if (jobOpening.title !== payload.title) {
            const alreadyExists = await jobOpeningRepository.existsByTitle({
                title: payload.title!,
                companyId: jobOpening.companyId,
            });
            if (alreadyExists) {
                ApiError.throwBadRequest(`job opening with title ${payload.title} already exists`);
            }
        }

        const updatedJobOpening = _.merge(jobOpening, payload);
        await jobOpeningRepository.update(updatedJobOpening);

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningUpdated,
            payload: {
                jobOpeningId: updatedJobOpening.id,
            },
        });

        return jobOpeningParser.toDto({ jobOpening: updatedJobOpening, role: context.user.role });
    },

    close: async ({ jobOpeningId, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        if (!jobOpeningBusiness.canBeClosed({ jobOpening, context })) {
            ApiError.throwBadRequest('job opening cannot be closed');
        }

        jobOpening.status = JobOpeningStatus.closed;

        await jobOpeningRepository.update(jobOpening);

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningUpdated,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    open: async ({ jobOpeningId, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        if (jobOpening.status !== JobOpeningStatus.draft) {
            ApiError.throwBadRequest('job opening cannot be opened');
        }

        jobOpening.status = JobOpeningStatus.open;

        await jobOpeningRepository.update(jobOpening);

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningUpdated,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    fill: async ({ jobOpeningId, payload, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        if (jobOpening.status !== JobOpeningStatus.open) {
            ApiError.throwBadRequest('job opening cannot be filled');
        }

        jobOpening.status = JobOpeningStatus.filled;
        jobOpening.selectedApplicationId = payload.selectedJobApplicationId;

        await jobOpeningRepository.update(jobOpening);

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningUpdated,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    toDraft: async ({ jobOpeningId, context }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        if (jobOpening.status !== JobOpeningStatus.open) {
            ApiError.throwBadRequest('job opening cannot be set to draft');
        }

        const existsApplications = await jobApplicationRepository.exists({
            jobOpeningId: jobOpening.id,
            status: JobApplicationStatus.applied,
        });
        if (existsApplications) {
            ApiError.throwBadRequest(
                'job opening cannot be set to draft. There are pending applications. To set to draft, all applications must be reject all applications or delete them',
            );
        }

        jobOpening.status = JobOpeningStatus.draft;

        await jobOpeningRepository.update(jobOpening);

        return jobOpeningParser.toDto({ jobOpening, role: context.user.role });
    },

    remove: async ({ jobOpeningId }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        await jobQueueService.enqueue({
            event: AppEvent.jobOpeningRemoved,
            payload: {
                jobOpeningId: jobOpening.id,
            },
        });

        await jobOpeningRepository.deleteById(jobOpeningId);
    },

    validateForApplication: async ({ jobOpeningId }) => {
        const jobOpening = await jobOpeningRepository.findById(jobOpeningId);
        if (!jobOpening) {
            ApiError.throwNotFound(`job opening with id ${jobOpeningId} not found`);
            return null!;
        }

        const acceptNewApplications = jobOpening.status === JobOpeningStatus.open;
        if (!acceptNewApplications) {
            ApiError.throwUnprocessableEntity(
                `job opening ${jobOpeningId} is not accepting applications`,
            );
        }

        return jobOpening;
    },

    canBeClosed: ({ jobOpening }) => {
        const closableStatuses: JobOpeningStatus[] = [
            JobOpeningStatus.open,
            JobOpeningStatus.draft,
        ];
        return closableStatuses.includes(jobOpening.status);
    },
};
