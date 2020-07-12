import CreateUserController from './CreateUser.controller';
import UpdateAvatarController from './UpdateAvatar.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
  updateAvatar: UpdateAvatarController;
}
