import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import FakeRecoveryTokenRepository from '@infra/repositories/UserToken/FakeRecoveryToken.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import RecoveryPasswordService from '@domain/services/User/RecoveryPassword.service';
import RecoveryPasswordController from './RecoveryPassword.controller';

describe('PasswordChangeController', () => {
  it('should be able to recovery password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeRecoveryTokenRepository = new FakeRecoveryTokenRepository();
    const bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptorAdapter,
    );
    const emailService = new FakeEmailHandlerService();
    const recoveryPasswordService = new RecoveryPasswordService(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      emailService,
    );
    const recoveryPasswordController = new RecoveryPasswordController(
      recoveryPasswordService,
    );
    const userEmail = 'user@provider.com';

    await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    expect(
      recoveryPasswordController.handle({
        email: userEmail,
      }),
    ).resolves.not.toThrow();
  });
});
