import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import CreateAuthenticationService from '@domain/services/Authentication/CreateAuthentication.service';
import VerifyAuthenticationService from '@domain/services/Authentication/VerifyAuthentication.service';
import VerifyAuthenticationController from './VerifyAuthentication.controller';

describe('VerifyAuthenticationController', () => {
  it('should be able to verify token and return user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const createAuthenticationService = new CreateAuthenticationService(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );
    const verifyAuthenticationService = new VerifyAuthenticationService(
      jwtAuthenticate,
    );

    const verifyAuthenticationController = new VerifyAuthenticationController(
      verifyAuthenticationService,
    );

    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: userPassword,
    });

    const { token } = await createAuthenticationService.execute({
      email: userEmail,
      password: userPassword,
    });

    const authResponse = verifyAuthenticationController.handle(
      `Bearer ${token}`,
    );

    expect(authResponse).toHaveProperty('userId');
  });
});
