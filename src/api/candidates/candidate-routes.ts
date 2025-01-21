import { Router } from 'express';
import candidateController from './candidate-controller';
import candidateSchemas from './candidate-schema';
import validate from '../../middlewares/validation-middleware';

const candidateRoutes = Router();

candidateRoutes.get(
  '/:id',
  validate(candidateSchemas.findById),
  candidateController.findById as any,
);

candidateRoutes.get(
  '/',
  validate(candidateSchemas.findAll),
  candidateController.findAll,
);

candidateRoutes.post(
  '/',
  validate(candidateSchemas.create),
  candidateController.create as any,
);

candidateRoutes.put(
  '/:id',
  validate(candidateSchemas.update),
  candidateController.update as any,
);

candidateRoutes.delete(
  '/:id',
  validate(candidateSchemas.remove),
  candidateController.remove,
);

export default candidateRoutes;
