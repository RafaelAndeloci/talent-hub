import { Router } from 'express';
import companyController from './company-controller';
import companySchemas from './company-schema';
import validate from '../../middlewares/validation-middleware';

const companyRouter = Router();

companyRouter.post(
  '/',
  validate(companySchemas.create),
  companyController.create as any,
);

companyRouter.put(
  '/:id',
  validate(companySchemas.update),
  companyController.update as any,
);

companyRouter.delete(
  '/:id',
  validate(companySchemas.remove),
  companyController.remove,
);

companyRouter.get(
  '/:id',
  validate(companySchemas.findById),
  companyController.findById,
);

companyRouter.get(
  '/',
  validate(companySchemas.findAll),
  companyController.findAll as any,
);

export default companyRouter;
