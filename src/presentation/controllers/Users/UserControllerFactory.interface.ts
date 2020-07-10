import CreateUserController from './CreateUser.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
}
