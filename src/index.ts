import express from 'express';
import bodyParser from 'body-parser';

import mongooseLoader from './loaders/mongoose';
import config from './config';
import routes from './api/routes';

(async () => {
  const app = express();

  await mongooseLoader();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', async (req, res) => {
    res.send('Well done!');
  });

  app.use(routes());

  const { port } = config;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`The application is listening on port ${port}!`);
  });
})();
