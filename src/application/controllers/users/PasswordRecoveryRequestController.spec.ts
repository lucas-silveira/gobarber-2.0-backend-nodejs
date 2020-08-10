import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import FakeUserTokensRepository from '@infra/repositories/fake/FakeUserTokens.repository';
import BcryptEncryptor from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import PasswordRecoveryRequest from './PasswordRecoveryRequest.controller';

describe('PasswordChangeRequest', () => {
  it('should be able to recovery password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequest = new PasswordRecoveryRequest(
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
    await passwordRecoveryRequest.handle({
      email: userEmail,
    });

    expect(sendMailSpy).toHaveBeenCalled();
    expect(userTokensRepositorySpy).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to recovery password if the user not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequest = new PasswordRecoveryRequest(
      fakeUserRepository,
      fakeUserTokensRepository,
      emailService,
    );

    expect(
      passwordRecoveryRequest.handle({
        email: 'user@provider.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
