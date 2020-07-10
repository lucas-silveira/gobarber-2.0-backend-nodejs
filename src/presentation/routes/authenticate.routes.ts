import { Router } from 'express';

import authenticationControllerFactory from '@presentation/controllers/Authentication/AuthenticationController.factory';

const authenticationRouter = Router();
const { createAuthentication } = authenticationControllerFactory();

authenticationRouter.post('/', async (request, response) => {
  try {
    const authentication = createAuthentication.handle(request.body);
    return response.json(authentication);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authenticationRouter;
