import TypeormUserRepository from '@infra/repositories/typeorm/TypeormUser.repository';
import CreateAuthentication from '@domain/usecases/Authentication/CreateAuthentication.usecase';
import VerifyAuthentication from '@domain/usecases/Authentication/VerifyAuthentication.usecase';
import JWTAuthenticate from '@utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const jwtAuthenticate = new JWTAuthenticate();
  const bcryptEncryptor = new BcryptEncryptor();
  const createAuthentication = new CreateAuthentication(
    typeormUserRepository,
    jwtAuthenticate,
    bcryptEncryptor,
  );
  const verifyAuthentication = new VerifyAuthentication(jwtAuthenticate);
  const createAuthenticationController = new CreateAuthenticationController(
    createAuthentication,
  );
  const verifyAuthenticationController = new VerifyAuthenticationController(
    verifyAuthentication,
  );

  return {
    createAuthentication: createAuthenticationController,
    verifyAuthentication: verifyAuthenticationController,
  };
};

export default authenticationControllerFactory;