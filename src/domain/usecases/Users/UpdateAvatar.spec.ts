import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import FakeStorageHandlerAdapter from '@utils/storageHandler/FakeStorageHandler.adapter';
import CreateUser from './CreateUser.usecase';
import UpdateAvatar from './UpdateAvatar.usecase';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const updateAvatar = new UpdateAvatar(
      fakeUserRepository,
      fakeStorageHandler,
    );

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUser.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    expect(
      updateAvatar.execute({
        userId: user.id,
        avatarName: 'avatar.jpg',
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to update user avatar with incorrect user id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const updateAvatar = new UpdateAvatar(
      fakeUserRepository,
      fakeStorageHandler,
    );

    expect(
      updateAvatar.execute({
        userId: '1',
        avatarName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should delete old avatar when updating a new avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const fakeStorageHandler = new FakeStorageHandlerAdapter();
    const createUser = new CreateUser(fakeUserRepository, bcryptEncryptor);
    const updateAvatar = new UpdateAvatar(
      fakeUserRepository,
      fakeStorageHandler,
    );

    const deleteFileSpy = jest.spyOn(fakeStorageHandler, 'deleteFile');

    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUser.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarName: 'avatar.jpg',
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarName: 'avatar2.jpg',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('uploads', 'avatar.jpg');
  });
});
