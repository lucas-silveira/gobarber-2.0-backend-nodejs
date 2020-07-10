import { Router } from 'express';

import usersRouter from './users.routes';
import authenticateRouter from './authenticate.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authenticate', authenticateRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
