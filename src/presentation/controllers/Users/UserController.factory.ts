import TypeormUserRepository from '@src/infra/repositories/Typeorm/TypeormUser.repository';
import UserRepository from '@infra/repositories/User.repository';
import CreateUserController from '@presentation/controllers/Users/CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const userRepository = new UserRepository(typeormUserRepository);
  const createUser = new CreateUserController(userRepository);

  return {
    createUser,
  };
};

export default userControllerFactory;
