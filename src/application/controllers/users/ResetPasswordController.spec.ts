import FakeUserRepository from '@infra/repositories/fake/FakeUser.repository';
import FakeUserTokensRepository from '@infra/repositories/fake/FakeUserTokens.repository';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import ResetPasswordController from './ResetPassword.controller';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let bcryptEncryptor: BcryptEncryptorAdapter;
let dateFnsDateHandler: DateFnsDateHandlerAdapter;
let createUserService: CreateUserService;
let resetPasswordController: ResetPasswordController;

describe('ResetPasswordController', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    bcryptEncryptor = new BcryptEncryptorAdapter();
    dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    resetPasswordController = new ResetPasswordController(
      fakeUserRepository,
      fakeUserTokensRepository,
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
    const token = await fakeUserTokensRepository.generate(user.id);

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
    const token = await fakeUserTokensRepository.generate('123');

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
    const token = await fakeUserTokensRepository.generate(user.id);

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
