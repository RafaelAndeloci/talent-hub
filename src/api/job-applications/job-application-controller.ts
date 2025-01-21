import jobApplicationBusiness from './job-application-business';
import JobApplicationController from './types/job-application-controller';
import JobApplicationUpdateFeedbackPayload from './types/job-application-update-feedback-payload';
import JobApplicationUpdatePayload from './types/job-application-update-payload';
import JobApplyPayload from './types/job-apply-payload';
import HTTPStatus from 'http-status';

const jobApplicationController: JobApplicationController = {
  async apply(req, res) {
    const userId = res.locals.user.id as string;

    const payload = {
      ...req.body,
      userId,
    } as JobApplyPayload;

    const jobApplication = await jobApplicationBusiness.apply(payload);
    res.status(HTTPStatus.CREATED).json(jobApplication);
  },

  async update(req, res) {
    const userId = res.locals.user.id as string;

    const payload = {
      ...req.body,
      userId,
      jobApplicationId: req.params.id,
    } as JobApplicationUpdatePayload;

    const jobApplication = await jobApplicationBusiness.update(payload);
    res.json(jobApplication);
  },

  async updateFeeback(req, res) {
    const userId = res.locals.user.id as string;

    const payload = {
      ...req.body,
      jobApplicationId: req.params.id,
      userId,
    } as JobApplicationUpdateFeedbackPayload;

    const jobApplication = await jobApplicationBusiness.updateFeedback(payload);
    res.json(jobApplication);
  },

  async remove(req, res) {
    await jobApplicationBusiness.remove(req.params.id);
    res.sendStatus(HTTPStatus.NO_CONTENT);
  },

  async findById(req, res) {
    const jobApplication = await jobApplicationBusiness.findById(req.params.id);
    res.json(jobApplication);
  },

  async findAll(req, res) {
    const jobApplications = await jobApplicationBusiness.findAll(req.query);
    res.json(jobApplications);
  },
};

export default jobApplicationController;
