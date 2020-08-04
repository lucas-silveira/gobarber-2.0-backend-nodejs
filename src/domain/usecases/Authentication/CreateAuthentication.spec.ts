import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticate from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUser from '../Users/CreateUser.usecase';
import CreateAuthentication from './CreateAuthentication.usecase';

describe('Create User', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticate();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const createAuthentication = new CreateAuthentication(
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

    const authenticate = await createAuthentication.execute({
      email: userEmail,
      password: userPassword,
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });

  it('should not be able to authenticate with no existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticate();
    const bcryptEncryptor = new BcryptEncryptor();
    const createAuthentication = new CreateAuthentication(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );

    expect(
      createAuthentication.execute({
        email: 'user@provider.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const jwtAuthenticate = new JWTAuthenticate();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const createAuthentication = new CreateAuthentication(
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

    expect(
      createAuthentication.execute({
        email: userEmail,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
