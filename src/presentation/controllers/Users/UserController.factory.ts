import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateUser from '@src/domain/services/Users/CreateUser.service';
import Encryptor from '@utils/Encryptor/Encryptor';
import UpdateAvatar from '@src/domain/services/Users/UpdateAvatar.service';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createUser = new CreateUser(typeormUserRepository, Encryptor);
  const updateAvatar = new UpdateAvatar(typeormUserRepository);
  const createUserController = new CreateUserController(createUser);
  const updateAvatarController = new UpdateAvatarController(updateAvatar);

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
  };
};

export default userControllerFactory;
