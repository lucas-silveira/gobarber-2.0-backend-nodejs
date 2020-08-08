import TypeormUserRepository from '@infra/repositories/typeorm/TypeormUser.repository';
import CreateUser from '@domain/services/Users/CreateUser.service';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import UpdateAvatar from '@domain/services/Users/UpdateAvatar.service';
import DiskStorageHandler from '@infra/utils/storageHandler/DiskStorageHandler.adapter';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptor();
  const diskStorageHandler = new DiskStorageHandler();
  const createUser = new CreateUser(typeormUserRepository, bcryptEncryptor);
  const updateAvatar = new UpdateAvatar(
    typeormUserRepository,
    diskStorageHandler,
  );
  const createUserController = new CreateUserController(createUser);
  const updateAvatarController = new UpdateAvatarController(updateAvatar);

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
  };
};

export default userControllerFactory;
