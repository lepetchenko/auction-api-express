import express from 'express';

import mongooseLoader from './loaders/mongoose';

(async () => {
  const app = express();

  await mongooseLoader();

  app.get('/', async (req, res) => {
    res.send('Well done!');
  });

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('The application is listening on port 3000!');
  });
})();
