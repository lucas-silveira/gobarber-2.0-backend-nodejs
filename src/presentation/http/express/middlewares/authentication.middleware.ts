import { Request, Response, NextFunction } from 'express';

import authenticationControllerFactory from '@main/controllers/authentication/AuthenticationController.factory';

const { verifyAuthentication } = authenticationControllerFactory();

const authenticationMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction,
): Response | void => {
  const authResponse = verifyAuthentication.handle(
    request.headers.authorization,
  );

  request.user = {
    id: authResponse.userId,
  };

  return next();
};

export default authenticationMiddleware;
