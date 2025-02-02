import { JobApplicationBusiness } from './types/job-application-business';
import { ApiError } from '../../types/api-error';
import { jobApplicationRepository } from './job-application-repository';
import { candidateBusiness } from '../candidates/candidate-business';
import { JobApplicationStatus } from './types/enums/job-application-status';
import { jobOpeningBusiness } from '../job-openings/job-opening-business';
import { jobApplicationParser } from './job-application-parser';
import { jobQueueService } from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import _ from 'lodash';

export const jobApplicationBusiness: JobApplicationBusiness = {
    findById: async ({ jobApplicationId }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        return jobApplication;
    },

    findAll: async ({ query }) => jobApplicationRepository.findAll(query),

    create: async ({ payload, context }) => {
        const existing = await jobApplicationRepository.exists({
            candidateId: payload.candidateId,
            jobOpeningId: payload.jobOpeningId,
            status: JobApplicationStatus.applied,
        });
        if (existing) {
            ApiError.throwBadRequest('job application already exists');
        }

        const candidate = await candidateBusiness.findById(payload.candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${payload.candidateId} not found`);
            return null!;
        }
        candidateBusiness.validateForApplication({ userRole: context.user.role, candidate });

        await jobOpeningBusiness.validateForApplication({
            jobOpeningId: payload.jobOpeningId,
            context,
        });

        const jobApplication = jobApplicationParser.newInstance({ payload, user: context.user });
        await jobApplicationRepository.create(jobApplication);

        await jobQueueService.enqueue({
            event: AppEvent.jobApplicationCreated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    },

    update: async ({ jobApplicationId, payload }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        if (jobApplication!.status !== JobApplicationStatus.applied) {
            ApiError.throwBadRequest('job application status must be applied to be updated');
            return null!;
        }

        if (payload.status === JobApplicationStatus.rejected && !payload.rejection) {
            ApiError.throwBadRequest('rejection reason is required');
            return null!;
        }

        const updated = _.merge(jobApplication, payload);
        await jobApplicationRepository.update(updated);

        await jobQueueService.enqueue({
            event: AppEvent.jobApplicationUpdated,
            payload: {
                jobApplicationId: updated.id,
            },
        });

        return updated;
    },

    remove: async ({ jobApplicationId }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        await jobApplicationRepository.deleteById(jobApplicationId);

        await jobQueueService.enqueue({
            event: AppEvent.jobApplicationRemoved,
            payload: {
                jobApplicationId,
            },
        });
    },
};
