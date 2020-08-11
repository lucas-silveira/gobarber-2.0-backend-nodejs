import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import FakeUserTokensRepository from '@infra/repositories/fake/FakeUserTokens.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import PasswordRecoveryRequestController from './PasswordRecoveryRequest.controller';

describe('PasswordChangeRequestController', () => {
  it('should be able to recovery password using the email', async () => {
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
    const userEmail = 'user@provider.com';

    const sendMailSpy = jest.spyOn(emailService, 'sendMail');
    const userTokensRepositorySpy = jest.spyOn(
      fakeUserTokensRepository,
      'generate',
    );

    const user = await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    await passwordRecoveryRequestController.handle({
      email: userEmail,
    });

    expect(sendMailSpy).toHaveBeenCalled();
    expect(userTokensRepositorySpy).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to recovery password if the user not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequestController = new PasswordRecoveryRequestController(
      fakeUserRepository,
      fakeUserTokensRepository,
      emailService,
    );

    expect(
      passwordRecoveryRequestController.handle({
        email: 'user@provider.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
