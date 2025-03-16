import {
    CreateJobApplicationPayload,
    JobApplication,
    JobApplicationStatus,
    PagedResponse,
    QueryArgs,
    UpdateJobApplicationCoverLetterPayload,
    UpdateJobApplicationStagePayload,
    UpdateJobApplicationStatusPayload,
} from '@talent-hub/shared';
import { JobApplicationRepository } from './job-application-repository';
import ApiError from '../../utils/api-error';
import UserRepository from '../users/user-repository';
import { RequestContext } from '../../types/request-context';
import { jobApplicationParser } from './job-application-parser';
import { CandidateBusiness } from '../candidates/candidate-business';
import { JobOpeningBusiness } from '../job-openings/job-opening-business';
import {JobQueueService} from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import moment from 'moment';

export class JobApplicationBusiness {
    public constructor(
        private readonly jobApplicationRepository = new JobApplicationRepository(),
        private readonly userRepository = new UserRepository(),
        private readonly candidateBusiness = new CandidateBusiness(),
        private readonly jobOpeningBusiness = new JobOpeningBusiness(),
    ) {}

    findById: (jobApplicationId: string) => Promise<JobApplication> = async (jobApplicationId) => {
        const jobApplication = await this.jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
        }

        return jobApplication;
    };

    findAll: (args: {
        query: QueryArgs<JobApplication>;
    }) => Promise<PagedResponse<JobApplication>> = async ({ query }) =>
        this.jobApplicationRepository.findAll(query);

    create: (args: {
        payload: CreateJobApplicationPayload;
        context: RequestContext;
    }) => Promise<JobApplication> = async ({ payload, context }) => {
        const userExists = await this.userRepository.exists({ id: context.user!.id });
        if (!userExists) {
            ApiError.throwNotFound(`user with id ${context.user!.id} not found`);
        }

        const candidate = await this.candidateBusiness.findById(context.user!.id);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${context.user!.id} not found`);
        }

        await this.candidateBusiness.validateForApplication({
            userRole: context.user!.role,
            candidate,
        });

        await this.jobOpeningBusiness.validateForApplication({
            jobOpeningId: payload.jobOpening.id,
        });

        const jobApplication = jobApplicationParser.newInstance({ payload, user: context.user! });

        await this.jobApplicationRepository.create({ entity: jobApplication });

        await JobQueueService.enqueue({
            event: AppEvent.JobApplicationCreated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    };

    async remove({ jobApplicationId }: { jobApplicationId: string }) {
        const jobApplication = await this.jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
        }

        await this.jobApplicationRepository.deleteById({ id: jobApplicationId });

        await JobQueueService.enqueue({
            event: AppEvent.JobApplicationRemoved,
            payload: {
                jobApplicationId,
            },
        });
    }

    async updateCoverLetter({
        jobApplicationId,
        payload,
    }: {
        jobApplicationId: string;
        payload: UpdateJobApplicationCoverLetterPayload;
    }) {
        const jobApplication = await this.jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
        }

        jobApplication.coverLetter = payload.coverLetter;
        await this.jobApplicationRepository.update({ entity: jobApplication });

        return jobApplication;
    }

    async updateStage({
        jobApplicationId,
        payload,
    }: {
        jobApplicationId: string;
        payload: UpdateJobApplicationStagePayload;
    }) {
        const jobApplication = await this.jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
        }

        jobApplication.stage = payload.stage;
        await this.jobApplicationRepository.update({ entity: jobApplication });

        await JobQueueService.enqueue({
            event: AppEvent.JobApplicationStageUpdated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    }

    async updateStatus({
        jobApplicationId,
        payload,
        context,
    }: {
        jobApplicationId: string;
        payload: UpdateJobApplicationStatusPayload;
        context: RequestContext;
    }) {
        const jobApplication = await this.jobApplicationRepository.findById(jobApplicationId);
        if (!jobApplication) {
            ApiError.throwNotFound(`job application with id ${jobApplicationId} not found`);
        }

        if (jobApplication.status !== JobApplicationStatus.waiting) {
            ApiError.throwBadRequest('job application status cannot be changed');
        }

        jobApplication.status = payload.status;

        if (payload.rejection) {
            if (payload.status !== JobApplicationStatus.rejected) {
                ApiError.throwBadRequest(
                    'rejection reason can only be set for rejected applications',
                );
            }

            jobApplication.rejection = {
                by: context.user!.id,
                reason: payload.rejection.reason,
                at: moment(),
            };
        }

        await this.jobApplicationRepository.update({ entity: jobApplication });

        await JobQueueService.enqueue({
            event: AppEvent.JobApplicationStatusUpdated,
            payload: {
                jobApplicationId: jobApplication.id,
            },
        });

        return jobApplication;
    }
}
