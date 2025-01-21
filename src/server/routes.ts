import candidateRoutes from '../api/candidates/candidate-routes';
import { Router } from 'express';
import authenticate from '../middlewares/auth-middleware';
import userRouter from '../api/users/user-routes';
import companyRoutes from '../api/companies/company-routes';
import jobOpportunityRoutes from '../api/job-opportunities/job-opportunity-routes';
import jobApplicationRoutes from '../api/job-applications/job-application-routes';

const apiRoutes = Router();

apiRoutes.use('/candidates', authenticate, candidateRoutes);
apiRoutes.use('/users', userRouter);
apiRoutes.use('/companies', authenticate, companyRoutes);
apiRoutes.use('/job-opportunities', authenticate, jobOpportunityRoutes);
apiRoutes.use('/job-applications', authenticate, jobApplicationRoutes);

export default apiRoutes;
