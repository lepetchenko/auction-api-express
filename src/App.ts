import express from 'express';
import bodyParser from 'body-parser';

import container from '@/ioc';
import routes from '@/api/routes';
import mongooseLoader from '@/loaders/mongoose';
import config from '@/config';
import { IApp } from '@/interfaces/IApp';
import handleError from '@/api/middlewares/handleError';
import logRequest from '@/api/middlewares/logRequest';
import TYPES from '@/constants/types';
import { ITelegramService } from '@/interfaces/ITelegramService';

class App implements IApp {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDataBaseORM();
    this.initializeListeners();
  }

  private initializeListeners = () => {
    container.get<ITelegramService>(TYPES.services.TelegramService);
  };

  private initializeMiddlewares = () => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logRequest);
  };

  private initializeRoutes = () => {
    this.app.use(routes());
    this.app.use(handleError);
  };

  private initializeDataBaseORM = () => {
    mongooseLoader();
  };

  public listen = () => {
    this.app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`The application is listening on port ${config.port}!`);
    });
  };
}

export default App;
