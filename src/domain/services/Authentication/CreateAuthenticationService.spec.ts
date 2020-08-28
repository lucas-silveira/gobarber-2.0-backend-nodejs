import FakeUserRepository from '@infra/repositories/User/FakeUser.repository';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import JWTAuthenticateAdapter from '@utils/authentication/JWTAuthenticate.adapter';
import CreateUserService from '@domain/services/User/CreateUser.service';
import CreateAuthenticationService from './CreateAuthentication.service';

let fakeUserRepository: FakeUserRepository;
let jwtAuthenticate: JWTAuthenticateAdapter;
let bcryptEncryptor: BcryptEncryptorAdapter;
let createUserService: CreateUserService;
let createAuthenticationService: CreateAuthenticationService;

describe('CreateAuthenticationService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    jwtAuthenticate = new JWTAuthenticateAdapter();
    bcryptEncryptor = new BcryptEncryptorAdapter();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptEncryptor,
    );
    createAuthenticationService = new CreateAuthenticationService(
      fakeUserRepository,
      jwtAuthenticate,
      bcryptEncryptor,
    );
  });

  it('should be able to authenticate', async () => {
    const userName = 'User';
    const userEmail = 'user@provider.com';
    const userPassword = '123456';

    const user = await createUserService.execute({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    const authenticate = await createAuthenticationService.execute({
      email: userEmail,
      password: userPassword,
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });

  it('should not be able to authenticate with no existing user', async () => {
    await expect(
      createAuthenticationService.execute({
        email: 'user@provider.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const userEmail = 'user@provider.com';

    await createUserService.execute({
      name: 'User',
      email: userEmail,
      password: '123456',
    });

    await expect(
      createAuthenticationService.execute({
        email: userEmail,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
