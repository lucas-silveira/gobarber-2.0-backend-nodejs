import CreateUserController from './CreateUser.controller';
import UpdateAvatarController from './UpdateAvatar.controller';
import PasswordRecoveryController from './PasswordRecovery.controller';
import ResetPasswordController from './ResetPassword.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
  updateAvatar: UpdateAvatarController;
  passwordRecovery: PasswordRecoveryController;
  resetPassword: ResetPasswordController;
}
