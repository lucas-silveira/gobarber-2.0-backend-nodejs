import TypeormUserRepository from '@infra/repositories/typeorm/TypeormUser.repository';
import CreateUser from '@domain/usecases/Users/CreateUser.usecase';
import BcryptEncryptor from '@utils/encryptor/BcryptEncryptor.adapter';
import UpdateAvatar from '@domain/usecases/Users/UpdateAvatar.usecase';
import FSStorageHandler from '@utils/storageHandler/FSStorageHandler.adapter';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const bcryptEncryptor = new BcryptEncryptor();
  const fsStorageHandler = new FSStorageHandler();
  const createUser = new CreateUser(typeormUserRepository, bcryptEncryptor);
  const updateAvatar = new UpdateAvatar(
    typeormUserRepository,
    fsStorageHandler,
  );
  const createUserController = new CreateUserController(createUser);
  const updateAvatarController = new UpdateAvatarController(updateAvatar);

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
  };
};

export default userControllerFactory;
