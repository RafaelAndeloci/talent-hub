import { Router } from 'express';
import JobOpportunityController from './job-opportunity-controller';
import jobOpportunitySchemas from './job-opportunity-schema';
import validate from '../../middlewares/validation-middleware';

const jobOpportunityRouter = Router();

jobOpportunityRouter.get(
  '/',
  validate(jobOpportunitySchemas.findAll),
  JobOpportunityController.findAll as any,
);

jobOpportunityRouter.get(
  '/:id',
  validate(jobOpportunitySchemas.findById),
  JobOpportunityController.findById,
);

jobOpportunityRouter.post(
  '/',
  validate(jobOpportunitySchemas.create),
  JobOpportunityController.create as any,
);

jobOpportunityRouter.put(
  '/:id',
  validate(jobOpportunitySchemas.update),
  JobOpportunityController.update as any,
);

jobOpportunityRouter.delete(
  '/:id',
  validate(jobOpportunitySchemas.remove),
  JobOpportunityController.remove,
);

export default jobOpportunityRouter;
