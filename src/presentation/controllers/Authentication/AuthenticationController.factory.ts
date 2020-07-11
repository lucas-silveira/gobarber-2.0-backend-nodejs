import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateAuthentication from '@src/domain/services/Authentication/CreateAuthentication.service';
import Encryptor from '@utils/Encryptor/Encryptor';
import Authenticate from '@utils/Authentication/Authenticate';
import CreateAuthenticationController from './CreateAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createAuthentication = new CreateAuthentication(
    typeormUserRepository,
    Authenticate,
    Encryptor,
  );
  const createAuthenticationController = new CreateAuthenticationController(
    createAuthentication,
  );

  return {
    createAuthentication: createAuthenticationController,
  };
};

export default authenticationControllerFactory;
