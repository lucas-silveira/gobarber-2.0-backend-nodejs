import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticate from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUser from '../Users/CreateUser.usecase';
import CreateAuthentication from './CreateAuthentication.usecase';
import VerifyAuthentication from './VerifyAuthentication.usecase';

describe('Create User', () => {
  it('should be able to verify token and return user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticate();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const createAuthentication = new CreateAuthentication(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );
    const verifyAuthentication = new VerifyAuthentication(jwtAuthenticate);

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    await createUser.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const authenticate = await createAuthentication.execute({
      email: userEmail,
      password: userPassword,
    });

    const verifiedToken = verifyAuthentication.execute(
      `Bearer ${authenticate.token}`,
    );

    expect(verifiedToken).toHaveProperty('userId');
  });

  it('should not be able to verify token with invalid token', async () => {
    const jwtAuthenticate = new JWTAuthenticate();
    const verifyAuthentication = new VerifyAuthentication(jwtAuthenticate);

    expect(() => verifyAuthentication.execute(`Bearer 123`)).toThrow(Error);
  });
});
