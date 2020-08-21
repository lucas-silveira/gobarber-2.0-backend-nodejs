import TypeormUserRepository from '@infra/repositories/User/TypeormUser.repository';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateAuthenticationService from '@domain/services/Authentication/CreateAuthentication.service';
import VerifyAuthenticationService from '@domain/services/Authentication/VerifyAuthentication.service';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const jwtAuthenticate = new JWTAuthenticateAdapter();
  const bcryptEncryptor = new BcryptEncryptorAdapter();
  const createAuthenticationService = new CreateAuthenticationService(
    typeormUserRepository,
    jwtAuthenticate,
    bcryptEncryptor,
  );
  const verifyAuthenticationService = new VerifyAuthenticationService(
    jwtAuthenticate,
  );
  const createAuthenticationController = new CreateAuthenticationController(
    createAuthenticationService,
  );
  const verifyAuthenticationController = new VerifyAuthenticationController(
    verifyAuthenticationService,
  );

  return {
    createAuthentication: createAuthenticationController,
    verifyAuthentication: verifyAuthenticationController,
  };
};

export default authenticationControllerFactory;
