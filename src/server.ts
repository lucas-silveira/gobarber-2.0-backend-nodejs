import express from 'express';
import 'reflect-metadata';

import './configs/database';
import { config as uploadConfig } from '@configs/upload';
import routes from './presentation/routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('[*] Server started on port 3333');
});
