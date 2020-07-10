import { Router } from 'express';

import userControllerFactory from '@presentation/controllers/Users/UserController.factory';

const usersRouter = Router();
const { createUser } = userControllerFactory();

usersRouter.post('/', async (request, response) => {
  try {
    const user = await createUser.handle(request.body);
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
