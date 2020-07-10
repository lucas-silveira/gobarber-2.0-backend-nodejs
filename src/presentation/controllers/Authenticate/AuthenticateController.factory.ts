import CreateAuthenticateController from './CreateAuthenticate.controller';
import IAuthenticateControllerFactory from './AuthenticateControllerFactory.interface';

const authenticateControllerFactory = (): IAuthenticateControllerFactory => {
  const createAuthenticate = new CreateAuthenticateController();

  return {
    createAuthenticate,
  };
};

export default authenticateControllerFactory;
