import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import FakeRecoveryTokenRepository from '@infra/repositories/RecoveryToken/FakeRecoveryToken.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import ResetPasswordService from '@domain/services/User/ResetPassword.service';
import ResetPasswordController from './ResetPassword.controller';

describe('ResetPasswordController', () => {
  it('should be able to reset password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeRecoveryTokenRepository = new FakeRecoveryTokenRepository();
    const bcryptEncryptor = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      bcryptEncryptor,
    );
    const resetPasswordController = new ResetPasswordController(
      resetPasswordService,
    );
    const user = await createUserService.execute({
      name: 'User',
      email: 'user@provider.com',
      password: '123456',
    });

    const token = await fakeRecoveryTokenRepository.generate(user.id);

    expect(
      resetPasswordController.handle({
        token,
        password: '1234567',
      }),
    ).resolves.not.toThrow();
  });
});
