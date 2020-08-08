import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUser from '@domain/services/Users/CreateUser.service';
import CreateAuthenticationController from './CreateAuthentication.controller';

describe('Create User', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const createAuthenticationController = new CreateAuthenticationController(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUser.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const authenticate = await createAuthenticationController.handle({
      email: userEmail,
      password: userPassword,
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });

  it('should not be able to authenticate with no existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createAuthenticationController = new CreateAuthenticationController(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );

    expect(
      createAuthenticationController.handle({
        email: 'user@provider.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticateAdapter();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const createAuthenticationController = new CreateAuthenticationController(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );

    const userEmail = 'user@provider.com';

    await createUser.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    await expect(
      createAuthenticationController.handle({
        email: userEmail,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
