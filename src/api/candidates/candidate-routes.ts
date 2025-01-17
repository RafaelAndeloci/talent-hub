import { Router } from 'express';
import candidateController from './candidate-controller';
import candidateSchema from './candidate-schema';
import validate from '../../middlewares/validation-middleware';
import errorHandlerWrapper from '../../middlewares/error-handler-middle';

const candidateRoutes = Router();

candidateRoutes.get(
  '/:id',
  validate(candidateSchema.findById),
  errorHandlerWrapper(candidateController.findById),
);
candidateRoutes.get(
  '/',
  validate(candidateSchema.findAll),
  errorHandlerWrapper(candidateController.findAll),
);
candidateRoutes.post(
  '/',
  validate(candidateSchema.create),
  errorHandlerWrapper(candidateController.create),
);
candidateRoutes.put(
  '/:id',
  validate(candidateSchema.update),
  errorHandlerWrapper(candidateController.update),
);
candidateRoutes.delete(
  '/:id',
  validate(candidateSchema.remove),
  errorHandlerWrapper(candidateController.remove),
);

export default candidateRoutes;
