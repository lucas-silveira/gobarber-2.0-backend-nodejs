import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateAuthenticationService from '@domain/services/Authentication/CreateAuthentication.service';
import CreateUserService from '@domain/services/User/CreateUser.service';
import CreateAuthenticationController from './CreateAuthentication.controller';

describe('CreateAuthenticationController', () => {
  it('should be able to authenticate', async () => {
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
    const createAuthenticationController = new CreateAuthenticationController(
      createAuthenticationService,
    );

    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: userPassword,
    });

    const authResponse = await createAuthenticationController.handle({
      email: userEmail,
      password: userPassword,
    });

    expect(authResponse).toHaveProperty('token');
    expect(authResponse.user).toEqual(user);
  });
});
