import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import GetUserProfileController from './GetUserProfile.controller';

describe('GetUserProfileController', () => {
  it('should be able to get user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const encryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      encryptor,
    );

    const getUserProfileController = new GetUserProfileController(
      fakeUserRepository,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const userProfile = await getUserProfileController.handle(user.id);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('avatar');
    expect(user).toEqual(userProfile);
  });

  it('should not be able to get user profile with incorrect user id', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const getUserProfileController = new GetUserProfileController(
      fakeUserRepository,
    );

    await expect(getUserProfileController.handle('10')).rejects.toBeInstanceOf(
      Error,
    );
  });
});
