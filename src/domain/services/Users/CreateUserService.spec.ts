import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUser from './CreateUser.service';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
    const createUser = new CreateUser(
      fakeUserRepository,
      bcryptEncryptorAdapter,
    );

    const user = {
      name: 'User',
      email: 'user@provider.com',
      password: '123456',
    };

    const userCreated = await createUser.execute(user);

    delete user.password;

    expect(userCreated).toHaveProperty('id');
    expect(userCreated).toMatchObject(user);
  });

  it('should not be able to create a new user with email that is already in use', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
    const createUser = new CreateUser(
      fakeUserRepository,
      bcryptEncryptorAdapter,
    );

    const userEmail = 'user@provider.com';

    await createUser.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'User',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
