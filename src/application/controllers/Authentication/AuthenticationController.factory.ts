import { container } from 'tsyringe';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const createAuthenticationController = container.resolve(
    CreateAuthenticationController,
  );
  const verifyAuthenticationController = container.resolve(
    VerifyAuthenticationController,
  );

  return {
    createAuthentication: createAuthenticationController,
    verifyAuthentication: verifyAuthenticationController,
  };
};

export default authenticationControllerFactory;
