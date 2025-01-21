import JobApplicationBusiness from './types/job-application-business';
import jobApplicationRepository from './job-application-repository';
import { JobApplicationStatus, Role } from '@prisma/client';
import ApiError from '../../types/api-error';
import JobApplicationModel, {
  JobApplicationFeedbackModel,
} from './types/job-application-model';
import JobApplication from './types/job-application';
import jobOpportunityRepository from '../job-opportunities/job-opportunity-repository';
import jobOpportunityBusiness from '../job-opportunities/job-opportunity-business';
import userRepository from '../users/user-repository';
import companyBusiness from '../companies/company-business';
import candidateRepository from '../candidates/candidate-repository';
import * as uuid from 'uuid';

const fromDatabase = (model: JobApplicationModel): JobApplication => {
  const { deletedAt, updatedAt, feedbackHistory, ...rest } = model;

  return {
    ...rest,
    feedbackHistory: feedbackHistory.map(({ id, ...rest }) => ({
      ...rest,
    })),
  } as JobApplication;
};

const jobApplicationBusiness: JobApplicationBusiness = {
  async apply(payload) {
    const jobOpportunity = await jobOpportunityRepository.findById(
      payload.jobOpportunityId,
    );

    if (!jobOpportunity) {
      ApiError.throwNotFound(
        `job opportunity with id ${payload.jobOpportunityId} not found`,
      );
    }

    if (!jobOpportunityBusiness.acceptApplication(jobOpportunity)) {
      ApiError.throwBadRequest(
        `job opportunity with id ${payload.jobOpportunityId} is not accepting applications`,
      );
    }

    const createdBy = await userRepository.findById(payload.userId);
    if (!createdBy) {
      ApiError.throwNotFound(`user with id ${payload.userId} not found`);
    }

    const company = await companyBusiness.findById(jobOpportunity.companyId);
    if (!company) {
      ApiError.throwNotFound(
        `company with id ${jobOpportunity.companyId} not found`,
      );
    }

    const candidate = await candidateRepository.findById(payload.candidateId);
    if (!candidate) {
      ApiError.throwNotFound(
        `candidate with id ${payload.candidateId} not found`,
      );
    }

    if (
      createdBy.role !== Role.CANDIDATE &&
      !candidate.acceptThirdPartyApplications
    ) {
      ApiError.throwBadRequest(
        'candidate not accepting third party applications',
      );
    }

    const application: JobApplicationModel = {
      id: uuid.v4(),
      candidateId: payload.candidateId,
      jobOpportunityId: payload.jobOpportunityId,
      status: JobApplicationStatus.PENDING,
      updatedBy: payload.userId,
      appliedAt: new Date(),
      updatedAt: new Date(),
      createdBy: payload.userId,
      feedbackHistory: [],
      interviewNotes: [],
      deletedAt: null,
      rejectionReason: null,
    };

    const _ = await jobApplicationRepository.create(application);
    return fromDatabase(application);
  },

  async update({
    jobApplicationId,
    userId: updatedBy,
    status,
    rejectionReason,
    interviewNotes,
  }) {
    const jobApplication =
      await jobApplicationRepository.findById(jobApplicationId);
    if (!jobApplication) {
      ApiError.throwNotFound(
        `job application with id ${jobApplicationId} not found`,
      );
    }

    if (this.isCanceled(jobApplication)) {
      ApiError.throwBadRequest(
        `job application with id ${jobApplicationId} is already canceled`,
      );
    }

    const updaterUser = await userRepository.findById(updatedBy);
    if (!updatedBy) {
      ApiError.throwNotFound(`user with id ${updatedBy} not found`);
    }

    if (updaterUser.role === Role.CANDIDATE) {
      ApiError.throwForbidden('candidates cannot update job applications');
    }

    const updatedApplication: JobApplicationModel = {
      ...jobApplication,
      status: status || jobApplication.status,
      updatedBy: updatedBy,
      updatedAt: new Date(),
      rejectionReason: rejectionReason || jobApplication.rejectionReason,
      interviewNotes: interviewNotes || jobApplication.interviewNotes,
    };

    await jobApplicationRepository.update(updatedApplication);

    return fromDatabase(updatedApplication);
  },

  async updateFeedback({ jobApplicationId, title, message, userId }) {
    const jobApplication =
      await jobApplicationRepository.findById(jobApplicationId);
    if (!jobApplication) {
      ApiError.throwNotFound(
        `job application with id ${jobApplicationId} not found`,
      );
    }

    if (this.isCanceled(jobApplication)) {
      ApiError.throwBadRequest(
        `job application with id ${jobApplicationId} is already canceled`,
      );
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      ApiError.throwNotFound(`user with id ${userId} not found`);
    }

    if (user.role === Role.CANDIDATE) {
      ApiError.throwForbidden('candidates cannot update job applications');
    }

    const existingFeedback = jobApplication.feedbackHistory.find(
      feedback => feedback.title === title,
    );

    const feedback = {
      id: existingFeedback?.id || uuid.v4(),
      ...existingFeedback,
      title,
      message,
      updatedAt: new Date(),
      createdBy: existingFeedback?.createdBy || userId,
    } as JobApplicationFeedbackModel;

    const updatedApplication: JobApplicationModel = {
      ...jobApplication,
      feedbackHistory: [
        ...jobApplication.feedbackHistory.filter(
          feedback => feedback.title !== title,
        ),
        feedback,
      ],
    };

    return fromDatabase(
      await jobApplicationRepository.update(updatedApplication),
    );
  },

  async remove(id) {
    if (
      !(await jobApplicationRepository.exists({
        id,
        status: {
          notIn: [
            JobApplicationStatus.CANCELED_BY_COMPANY,
            JobApplicationStatus.CANCELED_BY_CANDIDATE,
          ],
        },
      }))
    ) {
      ApiError.throwNotFound(
        `job application with id ${id} not found or already canceled`,
      );
    }

    await jobApplicationRepository.remove(id);
  },

  async findById(id) {
    const jobApplication = await jobApplicationRepository.findById(id);
    return fromDatabase(jobApplication);
  },

  async findAll(args) {
    const jobApplications = await jobApplicationRepository.findAll(args as any);
    return jobApplications.parse(fromDatabase);
  },

  isCanceled(jobApplication: JobApplication) {
    return (
      jobApplication.status === JobApplicationStatus.CANCELED_BY_CANDIDATE ||
      jobApplication.status === JobApplicationStatus.CANCELED_BY_COMPANY
    );
  },
};

export default jobApplicationBusiness;
