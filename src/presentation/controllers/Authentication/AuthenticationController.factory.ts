import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateAuthentication from '@domain/usecases/Authentication/CreateAuthentication.usecase';
import BcryptEncryptor from '@utils/Encryptor/BcryptEncryptor.adapter';
import Authenticate from '@utils/Authentication/Authenticate';
import CreateAuthenticationController from './CreateAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptor();
  const createAuthentication = new CreateAuthentication(
    typeormUserRepository,
    Authenticate,
    bcryptEncryptor,
  );
  const createAuthenticationController = new CreateAuthenticationController(
    createAuthentication,
  );

  return {
    createAuthentication: createAuthenticationController,
  };
};

export default authenticationControllerFactory;
