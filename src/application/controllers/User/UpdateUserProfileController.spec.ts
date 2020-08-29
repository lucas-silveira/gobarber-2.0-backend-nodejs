import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import UpdateUserProfileService from '@domain/services/User/UpdateUserProfile.service';
import UpdateUserProfileController from './UpdateUserProfile.controller';

describe('UpdateUserProfileController', () => {
  it('should be able to update user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const encryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      encryptor,
    );
    const updateUserProfileService = new UpdateUserProfileService(
      fakeUserRepository,
      encryptor,
    );
    const updateUserProfileController = new UpdateUserProfileController(
      updateUserProfileService,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    expect(
      updateUserProfileController.handle({
        userId: user.id,
        name: userName,
        email: userEmail,
      }),
    ).resolves.not.toThrow();
  });
});
