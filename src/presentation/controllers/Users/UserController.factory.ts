import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateUser from '@domain/usecases/Users/CreateUser.usecase';
import Encryptor from '@utils/Encryptor/Encryptor';
import UpdateAvatar from '@domain/usecases/Users/UpdateAvatar.usecase';
import StorageHandler from '@utils/StorageHandler/StorageHandler';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createUser = new CreateUser(typeormUserRepository, Encryptor);
  const updateAvatar = new UpdateAvatar(typeormUserRepository, StorageHandler);
  const createUserController = new CreateUserController(createUser);
  const updateAvatarController = new UpdateAvatarController(updateAvatar);

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
  };
};

export default userControllerFactory;
