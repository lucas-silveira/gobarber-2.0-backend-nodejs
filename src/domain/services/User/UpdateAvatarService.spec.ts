import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import FakeStorageHandlerAdapter from '@utils/storageHandler/FakeStorageHandler.adapter';
import CreateUserService from './CreateUser.service';
import UpdateAvatarService from './UpdateAvatar.service';

describe('UpdateUserAvatarService', () => {
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

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    expect(
      updateAvatarService.execute({
        userId: user.id,
        avatarName: 'avatar.jpg',
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to update user avatar with incorrect user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageHandler,
    );

    expect(
      updateAvatarService.execute({
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
    const updateAvatarService = new UpdateAvatarService(
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

    await updateAvatarService.execute({
      userId: user.id,
      avatarName: 'avatar.jpg',
    });

    await updateAvatarService.execute({
      userId: user.id,
      avatarName: 'avatar2.jpg',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('uploads', 'avatar.jpg');
  });
});
