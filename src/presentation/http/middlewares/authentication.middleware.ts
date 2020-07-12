import { Request, Response, NextFunction } from 'express';

import VerifyAuthentication from '@domain/services/Authentication/VerifyAuthentication.service';

const verifyAuthentication = new VerifyAuthentication();
const authenticationMiddleware = (
  request: Request,
  response: Response,
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
