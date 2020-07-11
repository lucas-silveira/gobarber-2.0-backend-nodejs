import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateUser from '@src/domain/services/Users/CreateUser.service';
import Encryptor from '@utils/Encryptor/Encryptor';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createUser = new CreateUser(typeormUserRepository, Encryptor);
  const createUserController = new CreateUserController(createUser);

  return {
    createUser: createUserController,
  };
};

export default userControllerFactory;
