import { Router } from 'express';
import candidateController from './candidate-controller';
import candidateSchemas from './candidate-schema';
import validate from '../../middlewares/validation-middleware';
import upload, { singleFileUpload } from '../../middlewares/file-upload-middleware';

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

candidateRoutes.put(
  '/:id/cv',
  singleFileUpload,
  validate(candidateSchemas.updateCv),
  candidateController.updateCv as any,
);

export default candidateRoutes;
