import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import CreateUserController from './CreateUser.controller';

describe('CreateUserController', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const createUserController = new CreateUserController(createUserService);

    const user = {
      name: 'User',
      email: 'user@provider.com',
      password: '123456',
    };

    const userCreated = await createUserController.handle(user);

    delete user.password;

    expect(userCreated).toHaveProperty('id');
    expect(userCreated).toMatchObject(user);
  });
});
