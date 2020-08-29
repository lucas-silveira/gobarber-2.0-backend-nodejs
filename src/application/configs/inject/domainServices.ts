import { container } from 'tsyringe';
import { ICreateAppointmentService } from '@domain/services/Appointment/CreateAppointmentService.interface';
import CreateAppointmentService from '@domain/services/Appointment/CreateAppointment.service';
import { ICreateAuthenticationService } from '@domain/services/Authentication/CreateAuthenticationService.interface';
import CreateAuthenticationService from '@domain/services/Authentication/CreateAuthentication.service';
import VerifyAuthenticationService from '@domain/services/Authentication/VerifyAuthentication.service';
import { IVerifyAuthenticationService } from '@domain/services/Authentication/VerifyAuthenticationService.interface';
import { IUpdateAvatarService } from '@domain/services/User/UpdateAvatarService.interface';
import UpdateAvatarService from '@domain/services/User/UpdateAvatar.service';
import { IRecoveryPasswordService } from '@domain/services/User/RecoveryPasswordService.interface';
import RecoveryPasswordService from '@domain/services/User/RecoveryPassword.service';
import { IResetPasswordService } from '@domain/services/User/ResetPasswordService.interface';
import ResetPasswordService from '@domain/services/User/ResetPassword.service';
import { ICreateUserService } from '@domain/services/User/CreateUserService.interface';
import CreateUserService from '@domain/services/User/CreateUser.service';
import UpdateUserProfileService from '@domain/services/User/UpdateUserProfile.service';
import { IUpdateUserProfileService } from '@domain/services/User/UpdateUserProfileService.interface';

// Authentication
container.register<ICreateAuthenticationService>(
  'CreateAuthenticationService',
  CreateAuthenticationService,
);
container.register<IVerifyAuthenticationService>(
  'VerifyAuthenticationService',
  VerifyAuthenticationService,
);

// Appointment
container.register<ICreateAppointmentService>(
  'CreateAppointmentService',
  CreateAppointmentService,
);
container.register<IUpdateAvatarService>(
  'UpdateAvatarService',
  UpdateAvatarService,
);

// User
container.register<ICreateUserService>('CreateUserService', CreateUserService);
container.register<IUpdateUserProfileService>(
  'UpdateUserProfileService',
  UpdateUserProfileService,
);
container.register<IRecoveryPasswordService>(
  'RecoveryPasswordService',
  RecoveryPasswordService,
);
container.register<IResetPasswordService>(
  'ResetPasswordService',
  ResetPasswordService,
);
