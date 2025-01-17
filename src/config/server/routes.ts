import candidateRouter from '../../features/candidates/candidate-routes';
import { Router } from 'express';
import authenticate from './middlewares/auth-middleware';
import userRouter from '../../features/users/user-routes';

const routes = Router();

routes.use('/candidates', authenticate, candidateRouter);
routes.use('/users', userRouter);

export default routes;
