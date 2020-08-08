import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUser from './CreateUser.service';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);

    const user = await createUser.execute({
      name: 'User',
      email: 'user@provider.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toMatchObject(user);
  });

  it('should not be able to create a new user with email that is already in use', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);

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