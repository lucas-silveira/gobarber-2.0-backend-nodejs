import TypeormUserRepository from '@infra/repositories/User/TypeormUser.repository';
import CreateUserService from '@domain/services/User/CreateUser.service';
import UpdateAvatarService from '@domain/services/User/UpdateAvatar.service';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import DiskStorageHandlerAdapter from '@infra/utils/storageHandler/DiskStorageHandler.adapter';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';
import PasswordRecoveryController from './PasswordRecovery.controller';
import ResetPasswordController from './ResetPassword.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptorAdapter();
  const diskStorageHandler = new DiskStorageHandlerAdapter();
  const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
  const createUserService = new CreateUserService(
    typeormUserRepository,
    bcryptEncryptor,
  );
  const updateAvatarService = new UpdateAvatarService(
    typeormUserRepository,
    diskStorageHandler,
  );
  const createUserController = new CreateUserController(createUserService);
  const updateAvatarController = new UpdateAvatarController(
    updateAvatarService,
  );
  const passwordRecoveryController = new PasswordRecoveryController(
    typeormUserRepository,
  );
  const resetPasswordController = new ResetPasswordController(
    typeormUserRepository,
    bcryptEncryptor,
    dateFnsDateHandler,
  );

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
    passwordRecovery: passwordRecoveryController,
    resetPassword: resetPasswordController,
  };
};

export default userControllerFactory;
