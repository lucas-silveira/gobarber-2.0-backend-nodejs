import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';

import '@infra/configs/database';
import '@application/configs/inject';
import { config as uploadConfig } from '@infra/configs/upload';
import { IErrorExcepetion } from '@domain/protocols/utils/ErrorExcepetion.interface';
import routes from './routes';
import statusCode from './utils/statusCode';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (
    error: Error & IErrorExcepetion,
    _: Request,
    response: Response,
    __: NextFunction,
  ) => {
    const { errorType, message } = error;

    if (errorType) {
      const status = statusCode[errorType];
      return response.status(status).json({
        status,
        message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 500,
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('[*] Server started on port 3333');
});
