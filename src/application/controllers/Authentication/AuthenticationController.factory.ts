import TypeormUserRepository from '@infra/repositories/User/TypeormUser.repository';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const jwtAuthenticate = new JWTAuthenticateAdapter();
  const bcryptEncryptor = new BcryptEncryptorAdapter();
  const createAuthenticationController = new CreateAuthenticationController(
    typeormUserRepository,
    jwtAuthenticate,
    bcryptEncryptor,
  );
  const verifyAuthenticationController = new VerifyAuthenticationController(
    jwtAuthenticate,
  );

  return {
    createAuthentication: createAuthenticationController,
    verifyAuthentication: verifyAuthenticationController,
  };
};

export default authenticationControllerFactory;
