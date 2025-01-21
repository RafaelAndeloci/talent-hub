import { Router } from 'express';
import candidateController from './candidate-controller';
import candidateSchemas from './candidate-schema';
import validate from '../../middlewares/validation-middleware';
import errorHandlerWrapper from '../../middlewares/error-handler-middle';

const candidateRoutes = Router();

candidateRoutes.get(
  '/:id',
  validate(candidateSchemas.findById),
  errorHandlerWrapper(candidateController.findById),
);

candidateRoutes.get(
  '/',
  validate(candidateSchemas.findAll),
  errorHandlerWrapper(candidateController.findAll),
);

candidateRoutes.post(
  '/',
  validate(candidateSchemas.create),
  errorHandlerWrapper(candidateController.create),
);

candidateRoutes.put(
  '/:id',
  validate(candidateSchemas.update),
  errorHandlerWrapper(candidateController.update),
);

candidateRoutes.delete(
  '/:id',
  validate(candidateSchemas.remove),
  errorHandlerWrapper(candidateController.remove),
);

export default candidateRoutes;
