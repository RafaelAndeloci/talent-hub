import { Router } from 'express';
import companyController from './company-controller';
import companySchemas from './company-schema';
import errorHandlerWrapper from '../../middlewares/error-handler-middle';
import validate from '../../middlewares/validation-middleware';

const companyRouter = Router();

companyRouter.post(
  '/',
  validate(companySchemas.create),
  errorHandlerWrapper(companyController.create),
);

companyRouter.put(
  '/:id',
  validate(companySchemas.update),
  errorHandlerWrapper(companyController.update),
);

companyRouter.delete('/:id', errorHandlerWrapper(companyController.remove));

companyRouter.get('/:id', errorHandlerWrapper(companyController.findById));

companyRouter.get(
  '/',
  validate(companySchemas.findAll),
  errorHandlerWrapper(companyController.findAll),
);

export default companyRouter;
