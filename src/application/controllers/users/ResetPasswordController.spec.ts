import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import FakeUserTokensRepository from '@infra/repositories/fake/FakeUserTokens.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import PasswordRecoveryRequestController from './PasswordRecoveryRequest.controller';
import ResetPasswordController from './ResetPassword.controller';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let bcryptEncryptorAdapter: BcryptEncryptorAdapter;
let createUserService: CreateUserService;
let emailService: FakeEmailHandlerService;
let passwordRecoveryRequestController: PasswordRecoveryRequestController;
let resetPasswordController: ResetPasswordController;

describe('ResetPasswordController', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptorAdapter,
    );
    emailService = new FakeEmailHandlerService();
    passwordRecoveryRequestController = new PasswordRecoveryRequestController(
      fakeUserRepository,
      fakeUserTokensRepository,
      emailService,
    );
    resetPasswordController = new ResetPasswordController(
      fakeUserRepository,
      fakeUserTokensRepository,
      bcryptEncryptorAdapter,
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

    await passwordRecoveryRequestController.handle({
      email: userEmail,
    });

    const userToken = await fakeUserTokensRepository.findByUserId(user.id);

    await resetPasswordController.handle({
      token: userToken?.token || '',
      password: '1234567',
    });

    const userUpdated = await fakeUserRepository.findById(user.id);

    expect(userUpdated?.password).not.toBe(userCreated?.password);
  });

  it('should not be able to reset password with incorrect token.', async () => {
    expect(
      resetPasswordController.handle({
        token: '123',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to reset password with incorrect user id.', async () => {
    const token = await fakeUserTokensRepository.generate('123');

    expect(
      resetPasswordController.handle({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
