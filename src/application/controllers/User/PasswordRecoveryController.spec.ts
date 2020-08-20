import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import FakeRecoveryTokenRepository from '@infra/repositories/UserToken/FakeRecoveryToken.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import PasswordRecoveryController from './PasswordRecovery.controller';

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
    const passwordRecoveryController = new PasswordRecoveryController(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      emailService,
    );
    const userEmail = 'user@provider.com';

    const sendMailSpy = jest.spyOn(emailService, 'sendMail');
    const userTokensRepositorySpy = jest.spyOn(
      fakeRecoveryTokenRepository,
      'generate',
    );

    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    await passwordRecoveryController.handle({
      email: userEmail,
    });

    expect(sendMailSpy).toHaveBeenCalled();
    expect(userTokensRepositorySpy).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to recovery password if the user not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeRecoveryTokenRepository = new FakeRecoveryTokenRepository();
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryController = new PasswordRecoveryController(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      emailService,
    );

    expect(
      passwordRecoveryController.handle({
        email: 'user@provider.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
