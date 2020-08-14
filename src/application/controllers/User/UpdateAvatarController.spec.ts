import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import FakeStorageHandlerAdapter from '@utils/storageHandler/FakeStorageHandler.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import UpdateAvatarService from '@domain/services/User/UpdateAvatar.service';
import UpdateAvatarController from '@application/controllers/User/UpdateAvatar.controller';

describe('UpdateUserAvatarController', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const encryptor = new BcryptEncryptorAdapter();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      encryptor,
    );
    const updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageHandler,
    );
    const updateAvatarController = new UpdateAvatarController(
      updateAvatarService,
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
      updateAvatarController.handle({
        userId: user.id,
        avatarName: 'avatar.jpg',
      }),
    ).resolves.not.toThrow();
  });
});
