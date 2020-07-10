import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import UserRepository from '@infra/repositories/User.repository';
import CreateAuthenticationController from './CreateAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const userRepository = new UserRepository(typeormUserRepository);
  const createAuthentication = new CreateAuthenticationController(
    userRepository,
  );

  return {
    createAuthentication,
  };
};

export default authenticationControllerFactory;
