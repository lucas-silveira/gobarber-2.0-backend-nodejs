import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';

describe('Create User', () => {
  it('should be able to verify token and return user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const createAuthentication = new CreateAuthenticationController(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );
    const verifyAuthenticationController = new VerifyAuthenticationController(
      jwtAuthenticate,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const authenticate = await createAuthentication.handle({
      email: userEmail,
      password: userPassword,
    });

    const verifiedToken = verifyAuthenticationController.handle(
      `Bearer ${authenticate.token}`,
    );

    expect(verifiedToken).toHaveProperty('userId');
  });

  it('should not be able to verify token with invalid token', async () => {
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const verifyAuthentication = new VerifyAuthenticationController(
      jwtAuthenticate,
    );

    expect(() => verifyAuthentication.handle(`Bearer 123`)).toThrow(Error);
  });
});
