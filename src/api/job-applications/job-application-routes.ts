import { Router } from 'express';
import jobApplicationController from './job-application-controller';
import validate from '../../middlewares/validation-middleware';
import jobApplicationSchemas from './job-application-schema';
import errorHandlerWrapper from '../../middlewares/error-handler-middle';

const jobApplicationRoutes = Router();

jobApplicationRoutes.post(
  '/',
  validate(jobApplicationSchemas.apply),
  errorHandlerWrapper(jobApplicationController.apply),
);

jobApplicationRoutes.put(
  '/:id',
  validate(jobApplicationSchemas.update),
  errorHandlerWrapper(jobApplicationController.update),
);

jobApplicationRoutes.delete(
  '/:id',
  validate(jobApplicationSchemas.remove),
  errorHandlerWrapper(jobApplicationController.remove),
);

jobApplicationRoutes.get(
  '/:id',
  errorHandlerWrapper(jobApplicationController.findById),
);

jobApplicationRoutes.get(
  '/',
  validate(jobApplicationSchemas.findAll),
  errorHandlerWrapper(jobApplicationController.findAll),
);

jobApplicationRoutes.put(
  '/:id/feedback',
  validate(jobApplicationSchemas.updateFeedback),
  errorHandlerWrapper(jobApplicationController.updateFeeback),
);

export default jobApplicationRoutes;
