import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from './CreateUser.service';
import UpdateUserProfileService from './UpdateUserProfile.service';

let fakeUserRepository: FakeUserRepository;
let encryptor: BcryptEncryptorAdapter;
let createUserService: CreateUserService;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    encryptor = new BcryptEncryptorAdapter();
    createUserService = new CreateUserService(fakeUserRepository, encryptor);
    updateUserProfileService = new UpdateUserProfileService(
      fakeUserRepository,
      encryptor,
    );
  });

  it('should be able to update user profile', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: userName,
        email: userEmail,
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to update user profile with incorrect user id', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await expect(
      updateUserProfileService.execute({
        userId: '10',
        name: userName,
        email: userEmail,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to change for email thats already in use', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const user = await createUserService.execute({
      name: userName,
      email: 'user2@provider.com',
      password: userPassword,
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: userName,
        email: userEmail,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to update user password', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: userName,
        email: userEmail,
        oldPassword: userPassword,
        password: '123',
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to update user password with incorrect old password', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: userName,
        email: userEmail,
        oldPassword: '123',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
