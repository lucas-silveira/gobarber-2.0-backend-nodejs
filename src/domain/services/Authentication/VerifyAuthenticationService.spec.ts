import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import CreateAuthenticationService from './CreateAuthentication.service';
import VerifyAuthenticationService from './VerifyAuthentication.service';

describe('VerifyAuthenticationService', () => {
  it('should be able to verify token and return user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const createAuthentication = new CreateAuthenticationService(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );
    const verifyAuthenticationService = new VerifyAuthenticationService(
      jwtAuthenticate,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const authenticate = await createAuthentication.execute({
      email: userEmail,
      password: userPassword,
    });

    const verifiedToken = verifyAuthenticationService.execute(
      `Bearer ${authenticate.token}`,
    );

    expect(verifiedToken).toBe(user.id);
  });

  it('should not be able to verify token with invalid token', async () => {
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const verifyAuthentication = new VerifyAuthenticationService(
      jwtAuthenticate,
    );

    expect(() => verifyAuthentication.execute(`Bearer 123`)).toThrow(Error);
  });
});
