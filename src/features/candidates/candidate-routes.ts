import { Router } from 'express';
import candidateController from './candidate-controller';
import validate from '../../config/server/middlewares/validation-middleware';
import candidateSchema from './candidate-schema';
import errorHandler from '../../config/server/middlewares/error-handler-middle';

const candidateRoutes = Router();

candidateRoutes.get(
  '/:id',
  validate(candidateSchema.getById),
  errorHandler(candidateController.getById),
);
candidateRoutes.get(
  '/',
  validate(candidateSchema.getAll),
  errorHandler(candidateController.getAll),
);
candidateRoutes.post(
  '/',
  validate(candidateSchema.create),
  errorHandler(candidateController.create),
);
candidateRoutes.put(
  '/:id',
  validate(candidateSchema.update),
  errorHandler(candidateController.update),
);
candidateRoutes.delete(
  '/:id',
  validate(candidateSchema.remove),
  errorHandler(candidateController.remove),
);

export default candidateRoutes;
