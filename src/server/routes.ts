import candidateRouter from '../api/candidates/candidate-routes';
import { Router } from 'express';
import authenticate from '../middlewares/auth-middleware';
import userRouter from '../api/users/user-routes';
import companyRouter from '../api/companies/company-routes';

const routes = Router();

routes.use('/candidates', authenticate, candidateRouter);
routes.use('/users', userRouter);
routes.use('/companies', authenticate, companyRouter);

export default routes;
