import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateAuthentication from '@src/domain/services/Authentication/CreateAuthentication.service';
import CreateAuthenticationController from './CreateAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createAuthentication = new CreateAuthentication(typeormUserRepository);
  const createAuthenticationController = new CreateAuthenticationController(
    createAuthentication,
  );

  return {
    createAuthentication: createAuthenticationController,
  };
};

export default authenticationControllerFactory;
