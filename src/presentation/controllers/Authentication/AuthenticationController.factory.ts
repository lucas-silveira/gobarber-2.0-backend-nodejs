import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateAuthenticationController from './CreateAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createAuthentication = new CreateAuthenticationController(
    typeormUserRepository,
  );

  return {
    createAuthentication,
  };
};

export default authenticationControllerFactory;
