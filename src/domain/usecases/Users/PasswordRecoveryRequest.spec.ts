import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import PasswordRecoveryRequest from './PasswordRecoveryRequest.usecase';

describe('PasswordChangeRequest', () => {
  it('should be able to recovery password using the email', async () => {
    const emailService = new FakeEmailHandlerService();
    const passwordRecoveryRequest = new PasswordRecoveryRequest(emailService);

    const sendMailSpy = jest.spyOn(emailService, 'sendMail');

    await passwordRecoveryRequest.execute({
      email: 'user@provider.com',
    });

    expect(sendMailSpy).toHaveBeenCalled();
  });
});
