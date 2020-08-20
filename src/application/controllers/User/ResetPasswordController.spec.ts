import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import FakeRecoveryTokenRepository from '@infra/repositories/UserToken/FakeRecoveryToken.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import ResetPasswordController from './ResetPassword.controller';

let fakeUserRepository: FakeUserRepository;
let fakeRecoveryTokenRepository: FakeRecoveryTokenRepository;
let bcryptEncryptor: BcryptEncryptorAdapter;
let dateFnsDateHandler: DateFnsDateHandlerAdapter;
let createUserService: CreateUserService;
let resetPasswordController: ResetPasswordController;

describe('ResetPasswordController', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRecoveryTokenRepository = new FakeRecoveryTokenRepository();
    bcryptEncryptor = new BcryptEncryptorAdapter();
    dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    resetPasswordController = new ResetPasswordController(
      fakeUserRepository,
      fakeRecoveryTokenRepository,
      bcryptEncryptor,
      dateFnsDateHandler,
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

    await resetPasswordController.handle({
      token,
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
    const token = await fakeRecoveryTokenRepository.generate('123');

    expect(
      resetPasswordController.handle({
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
      resetPasswordController.handle({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
