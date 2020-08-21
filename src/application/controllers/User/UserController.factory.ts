import TypeormUserRepository from '@infra/repositories/User/TypeormUser.repository';
import CreateUserService from '@domain/services/User/CreateUser.service';
import UpdateAvatarService from '@domain/services/User/UpdateAvatar.service';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import DiskStorageHandlerAdapter from '@infra/utils/storageHandler/DiskStorageHandler.adapter';
import RecoveryPasswordService from '@domain/services/User/RecoveryPassword.service';
import ResetPasswordService from '@domain/services/User/ResetPassword.service';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';
import RecoveryPasswordController from './RecoveryPassword.controller';
import ResetPasswordController from './ResetPassword.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptorAdapter();
  const diskStorageHandler = new DiskStorageHandlerAdapter();
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
  const recoveryPasswordService = new RecoveryPasswordService(
    typeormUserRepository,
  );
  const resetPasswordService = new ResetPasswordService(
    typeormUserRepository,
    bcryptEncryptor,
  );
  const recoveryPasswordController = new RecoveryPasswordController(
    recoveryPasswordService,
  );
  const resetPasswordController = new ResetPasswordController(
    resetPasswordService,
  );

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
    recoveryPassword: recoveryPasswordController,
    resetPassword: resetPasswordController,
  };
};

export default userControllerFactory;
