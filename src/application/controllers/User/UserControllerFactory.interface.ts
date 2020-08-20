import CreateUserController from './CreateUser.controller';
import UpdateAvatarController from './UpdateAvatar.controller';
import RecoveryPasswordController from './RecoveryPassword.controller';
import ResetPasswordController from './ResetPassword.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
  updateAvatar: UpdateAvatarController;
  recoveryPassword: RecoveryPasswordController;
  resetPassword: ResetPasswordController;
}
