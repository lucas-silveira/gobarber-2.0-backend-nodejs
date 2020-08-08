import { Router } from 'express';

import authenticationControllerFactory from '@application/controllers/authentication/AuthenticationController.factory';

const authenticationRouter = Router();
const { createAuthentication } = authenticationControllerFactory();

authenticationRouter.post('/', async (request, response) => {
  const authentication = await createAuthentication.handle(request.body);
  return response.json(authentication);
});

export default authenticationRouter;
