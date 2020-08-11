import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import FakeStorageHandlerAdapter from '@utils/storageHandler/FakeStorageHandler.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import UpdateAvatarController from '@application/controllers/users/UpdateAvatar.controller';

describe('UpdateUserAvatarController', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const encryptor = new BcryptEncryptorAdapter();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      encryptor,
    );
    const updateAvatarController = new UpdateAvatarController(
      fakeUserRepository,
      fakeStorageHandler,
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

  it('should not be able to update user avatar with incorrect user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const updateAvatarController = new UpdateAvatarController(
      fakeUserRepository,
      fakeStorageHandler,
    );

    expect(
      updateAvatarController.handle({
        userId: '1',
        avatarName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should delete old avatar when updating a new avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const encryptor = new BcryptEncryptorAdapter();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      encryptor,
    );
    const updateAvatarController = new UpdateAvatarController(
      fakeUserRepository,
      fakeStorageHandler,
    );

    const deleteFileSpy = jest.spyOn(fakeStorageHandler, 'deleteFile');

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await updateAvatarController.handle({
      userId: user.id,
      avatarName: 'avatar.jpg',
    });

    await updateAvatarController.handle({
      userId: user.id,
      avatarName: 'avatar2.jpg',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('uploads', 'avatar.jpg');
  });
});
