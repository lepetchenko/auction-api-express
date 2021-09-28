import express from 'express';

import mongooseLoader from './loaders/mongoose';
import config from './config';

(async () => {
  const app = express();

  await mongooseLoader();

  app.get('/', async (req, res) => {
    res.send('Well done!');
  });

  const { port } = config;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`The application is listening on port ${port}!`);
  });
})();
