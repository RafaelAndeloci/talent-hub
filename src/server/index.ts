import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './routes';
import config from '../config/environment';
import logging from '../middlewares/logging-middleware';
import errorHandler from '../middlewares/error-handler-middleware';
import logger from '../services/logging-service';

const app = express();

app.use(logging);
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api', routes.api);
app.use('/static', routes.static);
app.use(errorHandler as any);

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
