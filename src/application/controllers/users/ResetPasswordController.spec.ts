import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import FakeUserTokensRepository from '@infra/repositories/fake/FakeUserTokens.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import PasswordRecoveryRequestController from './PasswordRecoveryRequest.controller';
import ResetPasswordController from './ResetPassword.controller';

describe('PasswordChangeRequest', () => {
  it('should be able to reset password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptorAdapter,
    );
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequestController = new PasswordRecoveryRequestController(
      fakeUserRepository,
      fakeUserTokensRepository,
      emailService,
    );
    const resetPasswordController = new ResetPasswordController(
      fakeUserRepository,
      fakeUserTokensRepository,
      bcryptEncryptorAdapter,
    );
    const userEmail = 'user@provider.com';

    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });
    const userCreated = await fakeUserRepository.findById(user.id);

    await passwordRecoveryRequestController.handle({
      email: userEmail,
    });
    const newPassword = '1234567';
    const userToken = await fakeUserTokensRepository.findByUserId(user.id);

    await resetPasswordController.handle({
      token: userToken?.token || '',
      password: newPassword,
    });

    const userUpdated = await fakeUserRepository.findById(user.id);

    expect(userUpdated?.password).not.toBe(userCreated?.password);
  });
});
