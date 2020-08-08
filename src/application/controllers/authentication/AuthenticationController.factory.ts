import TypeormUserRepository from '@infra/repositories/typeorm/TypeormUser.repository';
import JWTAuthenticate from '@utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';
import IAuthenticationControllerFactory from './AuthenticationControllerFactory.interface';

const authenticationControllerFactory = (): IAuthenticationControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const jwtAuthenticate = new JWTAuthenticate();
  const bcryptEncryptor = new BcryptEncryptor();
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
