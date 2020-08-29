import { container } from 'tsyringe';
import CreateUserController from './CreateUser.controller';
import IUserControllerFactory from './UserControllerFactory.interface';
import UpdateAvatarController from './UpdateAvatar.controller';
import RecoveryPasswordController from './RecoveryPassword.controller';
import ResetPasswordController from './ResetPassword.controller';
import UpdateUserProfileController from './UpdateUserProfile.controller';
import GetUserProfileController from './GetUserProfile.controller';

const userControllerFactory = (): IUserControllerFactory => {
  const createUserController = container.resolve(CreateUserController);
  const updateAvatarController = container.resolve(UpdateAvatarController);
  const updateUserProfileController = container.resolve(
    UpdateUserProfileController,
  );
  const getUserProfileController = container.resolve(GetUserProfileController);
  const recoveryPasswordController = container.resolve(
    RecoveryPasswordController,
  );
  const resetPasswordController = container.resolve(ResetPasswordController);

  return {
    createUser: createUserController,
    updateAvatar: updateAvatarController,
    updateUserProfile: updateUserProfileController,
    getUserProfile: getUserProfileController,
    recoveryPassword: recoveryPasswordController,
    resetPassword: resetPasswordController,
  };
};

export default userControllerFactory;
