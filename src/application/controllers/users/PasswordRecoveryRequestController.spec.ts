import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import BcryptEncryptor from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import PasswordRecoveryRequest from './PasswordRecoveryRequest.controller';

describe('PasswordChangeRequest', () => {
  it('should be able to recovery password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const bcryptEncryptor = new BcryptEncryptor();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequest = new PasswordRecoveryRequest(emailService);
    const userEmail = 'user@provider.com';

    const sendMailSpy = jest.spyOn(emailService, 'sendMail');

    await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });
    await passwordRecoveryRequest.handle({
      email: userEmail,
    });

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to recovery password if the user not exists', async () => {
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequest = new PasswordRecoveryRequest(emailService);

    expect(
      passwordRecoveryRequest.handle({
        email: 'user@provider.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
