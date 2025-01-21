import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import apiRoutes from './routes';
import config from '../config/environment';
import logging from '../middlewares/logging-middleware';
import multer from 'multer';
import errorHandler from '../middlewares/error-handler-middleware';
import logger from '../services/logging-service';

const app = express();

app.use(logging);
app.use(multer().single('file'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api', apiRoutes);
app.use(errorHandler);

app.listen(config.api.port, () => {
  logger.info(`Server is running at http://localhost:${config.api.port}`);
});

app.on('error', error => {
  logger.error(error);
});

app.on('close', () => {
  logger.info('Server is closing');
});

export default app;
