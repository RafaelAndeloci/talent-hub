import jobApplicationBusiness from './job-application-business';
import JobApplicationController from './types/job-application-controller';
import JobApplicationUpdateFeedbackPayload from './types/job-application-update-feedback-payload';
import JobApplicationUpdatePayload from './types/job-application-update-payload';
import JobApplyPayload from './types/job-apply-payload';
import HTTPStatus from 'http-status';

const jobApplicationController: JobApplicationController = {
  async apply(req, res, next) {
    try {
      const userId = res.locals.user.id as string;

      const payload = {
        ...req.body,
        userId,
      } as JobApplyPayload;

      const jobApplication = await jobApplicationBusiness.apply(payload);
      res.status(HTTPStatus.CREATED).json(jobApplication);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const userId = res.locals.user.id as string;

      const payload = {
        ...req.body,
        userId,
        jobApplicationId: req.params.id,
      } as JobApplicationUpdatePayload;

      const jobApplication = await jobApplicationBusiness.update(payload);
      res.status(HTTPStatus.OK).json(jobApplication);
    } catch (error) {
      next(error);
    }
  },

  async updateFeeback(req, res, next) {
    try {
      const userId = res.locals.user.id as string;

      const payload = {
        ...req.body,
        jobApplicationId: req.params.id,
        userId,
      } as JobApplicationUpdateFeedbackPayload;

      const jobApplication =
        await jobApplicationBusiness.updateFeedback(payload);
      res.status(HTTPStatus.OK).json(jobApplication);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      await jobApplicationBusiness.remove(req.params.id);
      res.sendStatus(HTTPStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const jobApplication = await jobApplicationBusiness.findById(
        req.params.id,
      );
      res.status(HTTPStatus.OK).json(jobApplication);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const jobApplications = await jobApplicationBusiness.findAll(req.query);
      res.status(HTTPStatus.OK).json(jobApplications);
    } catch (error) {
      next(error);
    }
  },
};

export default jobApplicationController;
