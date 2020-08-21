import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import FakeRecoveryTokenRepository from '@infra/repositories/RecoveryToken/FakeRecoveryToken.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import ResetPasswordService from './ResetPassword.service';

let fakeUserRepository: FakeUserRepository;
let fakeRecoveryTokenRepository: FakeRecoveryTokenRepository;
let bcryptEncryptor: BcryptEncryptorAdapter;
let createUserService: CreateUserService;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRecoveryTokenRepository = new FakeRecoveryTokenRepository();
    bcryptEncryptor = new BcryptEncryptorAdapter();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      bcryptEncryptor,
    );
  });

  it('should be able to reset password', async () => {
    const userEmail = 'user@provider.com';
    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });
    const userCreated = await fakeUserRepository.findById(user.id);
    const token = await fakeRecoveryTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      token,
      password: '1234567',
    });

    const userUpdated = await fakeUserRepository.findById(user.id);

    expect(userUpdated?.password).not.toBe(userCreated?.password);
  });

  it('should not be able to reset password with incorrect token.', async () => {
    expect(
      resetPasswordService.execute({
        token: '123',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to reset password with incorrect user id.', async () => {
    const token = await fakeRecoveryTokenRepository.generate('123');

    expect(
      resetPasswordService.execute({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to reset password if passed more than 2 hours.', async () => {
    const userEmail = 'user@provider.com';
    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });
    const token = await fakeRecoveryTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
