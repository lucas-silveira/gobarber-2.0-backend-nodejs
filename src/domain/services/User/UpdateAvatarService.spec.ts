import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import FakeStorageHandlerAdapter from '@utils/storageHandler/FakeStorageHandler.adapter';
import CreateUserService from './CreateUser.service';
import UpdateAvatarService from './UpdateAvatar.service';

let fakeUserRepository: FakeUserRepository;
let encryptor: BcryptEncryptorAdapter;
let fakeStorageHandler: FakeStorageHandlerAdapter;
let createUserService: CreateUserService;
let updateAvatarService: UpdateAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    encryptor = new BcryptEncryptorAdapter();
    fakeStorageHandler = new FakeStorageHandlerAdapter();
    createUserService = new CreateUserService(fakeUserRepository, encryptor);
    updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageHandler,
    );
  });

  it('should be able to update user avatar', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await expect(
      updateAvatarService.execute({
        userId: user.id,
        avatarName: 'avatar.jpg',
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to update user avatar with incorrect user id', async () => {
    await expect(
      updateAvatarService.execute({
        userId: '1',
        avatarName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should delete old avatar when updating a new avatar', async () => {
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
