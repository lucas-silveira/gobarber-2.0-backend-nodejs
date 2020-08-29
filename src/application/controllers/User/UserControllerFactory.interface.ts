import CreateUserController from './CreateUser.controller';
import UpdateAvatarController from './UpdateAvatar.controller';
import RecoveryPasswordController from './RecoveryPassword.controller';
import ResetPasswordController from './ResetPassword.controller';
import UpdateUserProfileController from './UpdateUserProfile.controller';
import GetUserProfileController from './GetUserProfile.controller';

export default interface IUserControllerFactory {
  createUser: CreateUserController;
  updateAvatar: UpdateAvatarController;
  updateUserProfile: UpdateUserProfileController;
  getUserProfile: GetUserProfileController;
  recoveryPassword: RecoveryPasswordController;
  resetPassword: ResetPasswordController;
}
