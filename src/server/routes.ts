import candidateRoutes from '../api/candidates/candidate-routes';
import { Router, Request, Response, NextFunction } from 'express';
import authenticate from '../middlewares/auth-middleware';
import userRouter from '../api/users/user-routes';
import companyRoutes from '../api/companies/company-routes';
import jobOpportunityRoutes from '../api/job-opportunities/job-opportunity-routes';
import jobApplicationRoutes from '../api/job-applications/job-application-routes';
import fileStorageService from '../services/file-storage-service';
import validate from '../middlewares/validation-middleware';
import { z } from 'zod';
import logger from '../services/logging-service';

const apiRoutes = Router();

apiRoutes.use('/candidates', authenticate, candidateRoutes);
apiRoutes.use('/users', userRouter);
apiRoutes.use('/companies', authenticate, companyRoutes);
apiRoutes.use('/job-opportunities', authenticate, jobOpportunityRoutes);
apiRoutes.use('/job-applications', authenticate, jobApplicationRoutes);

const staticRoutes = Router();

const staticFileHandler: (
  req: Request<{ fileKey: string }, any, any, any>,
  res: Response,
  next: NextFunction,
) => Promise<void> = async (req, res, next) => {
  try {
    const { fileKey } = req.params;
    const { stream, contentType } = await fileStorageService.getFileStream({
      key: fileKey,
    });

    if (!stream) {
      res.status(404).send('File not found');
      return;
    }

    res.setHeader('Content-Type', contentType);
    stream.pipe(res);

    stream.on('error', error => {
      logger.error(error);
      res.status(500).send('Internal server error');
    });

    stream.on('end', () => {
      res.end();
    });

    const destroyEvents = ['close', 'error', 'end'];
    destroyEvents.forEach(event => {
      res.on(event, () => {
        stream.destroy();
      });
    });
  } catch (err) {
    next(err);
  }
};

staticRoutes.get(
  '/:fileKey',
  authenticate,
  validate(
    z.object({
      params: z.object({
        fileKey: z.string(),
      }),
    }),
  ),
  staticFileHandler,
);

const routes = {
  static: staticRoutes,
  api: apiRoutes,
};

export default routes;
