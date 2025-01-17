import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './routes';
import config from '../config/environment';
import logging from '../middlewares/logging-middleware';
import multer from 'multer';

const app = express();

app.use(multer().single('file'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logging);
app.use('/api', routes);

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});

app.on('error', error => {
  console.log('Server error:', error);
});

app.on('close', () => {
  console.log('Server closed');
});

export default app;