import { Request, Response, NextFunction } from 'express';

import VerifyAuthentication from '@domain/usecases/Authentication/VerifyAuthentication.usecase';

const verifyAuthentication = new VerifyAuthentication();
const authenticationMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction,
): Response | void => {
  const authResponse = verifyAuthentication.execute(
    request.headers.authorization || '',
  );

  request.user = {
    id: authResponse.userId,
  };

  return next();
};

export default authenticationMiddleware;
