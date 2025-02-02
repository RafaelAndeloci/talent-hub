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
import { JobApplication } from './types/job-application';

const canChangeStatus = (jobApplication: JobApplication) =>
    jobApplication.status === JobApplicationStatus.applied;

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

    updateCoverLetter: async ({ jobApplicationId, payload }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        jobApplication.coverLetter = payload.coverLetter;
        await jobApplicationRepository.update(jobApplication);

        return jobApplication;
    },

    updateStage: async ({ jobApplicationId, payload }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        jobApplication.stage = payload.stage;
        await jobApplicationRepository.update(jobApplication);

        await jobQueueService.enqueue({
            event: AppEvent.jobApplicationStageUpdated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    },

    updateStatus: async ({ jobApplicationId, payload, context }) => {
        const jobApplication = await jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
            return null!;
        }

        if (!canChangeStatus(jobApplication)) {
            ApiError.throwBadRequest('job application status cannot be changed');
            return null!;
        }

        jobApplication.status = payload.status;

        if (payload.rejectionReason) {
            if (payload.status !== JobApplicationStatus.rejected) {
                ApiError.throwBadRequest(
                    'rejection reason can only be set for rejected applications',
                );
                return null!;
            }

            jobApplication.rejection = {
                rejectedBy: context.user.id,
                reason: payload.rejectionReason,
            };
        }

        await jobApplicationRepository.update(jobApplication);

        await jobQueueService.enqueue({
            event: AppEvent.jobApplicationStatusUpdated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    },
};
