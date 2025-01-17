import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './routes';
import config from '../environment';
import logging from './middlewares/logging-middleware';

const app = express();

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
