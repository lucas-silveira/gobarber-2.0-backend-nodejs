import CreateUserController from '@presentation/controllers/Users/CreateUser.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
}
