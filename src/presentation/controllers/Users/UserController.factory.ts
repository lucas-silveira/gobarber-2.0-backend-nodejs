import TypeormUserRepository from '@infra/repositories/Typeorm/TypeormUser.repository';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';

const userControllerFactory = (): IUserControllerFactory => {
  const typeormUserRepository = new TypeormUserRepository();
  const createUser = new CreateUserController(typeormUserRepository);

  return {
    createUser,
  };
};

export default userControllerFactory;
