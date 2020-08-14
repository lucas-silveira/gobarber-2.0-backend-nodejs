import TypeormUserRepository from '@infra/repositories/typeorm/TypeormUser.repository';
import CreateUserService from '@domain/services/Users/CreateUser.service';
import BcryptEncryptorAdapter from '@utils/encryptor/BcryptEncryptor.adapter';
import DiskStorageHandlerAdapter from '@infra/utils/storageHandler/DiskStorageHandler.adapter';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptorAdapter();
  const diskStorageHandler = new DiskStorageHandlerAdapter();
  const createUserService = new CreateUserService(
    typeormUserRepository,
    bcryptEncryptor,
  );
  const createUserController = new CreateUserController(createUserService);
  const updateAvatarController = new UpdateAvatarController(
    typeormUserRepository,
    diskStorageHandler,
  );

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
  };
};

export default userControllerFactory;
