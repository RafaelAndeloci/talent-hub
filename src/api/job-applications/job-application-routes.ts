import { Router } from 'express';
import jobApplicationController from './job-application-controller';
import validate from '../../middlewares/validation-middleware';
import jobApplicationSchemas from './job-application-schema';
import errorHandler from '../../middlewares/error-handler-middleware';

const jobApplicationRoutes = Router();

jobApplicationRoutes.get(
  '/:id',
  validate(jobApplicationSchemas.findById),
  jobApplicationController.findById,
);

jobApplicationRoutes.get(
  '/',
  validate(jobApplicationSchemas.findAll),
  jobApplicationController.findAll as any,
);

jobApplicationRoutes.post(
  '/',
  validate(jobApplicationSchemas.apply),
  jobApplicationController.apply,
);

jobApplicationRoutes.put(
  '/:id',
  validate(jobApplicationSchemas.update),
  jobApplicationController.update as any,
);

jobApplicationRoutes.delete(
  '/:id',
  validate(jobApplicationSchemas.remove),
  jobApplicationController.remove,
);

jobApplicationRoutes.put(
  '/:id/feedback',
  validate(jobApplicationSchemas.updateFeedback),
  jobApplicationController.updateFeeback,
);

export default jobApplicationRoutes;
