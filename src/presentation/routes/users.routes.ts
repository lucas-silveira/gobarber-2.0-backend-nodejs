import { Router } from 'express';

import userControllerFactory from '@presentation/controllers/Users/UserController.factory';

const usersRouter = Router();
const { createUser } = userControllerFactory();

usersRouter.post('/', async (request, response) => {
  try {
    const appointment = await createUser.handle(request.body);
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
