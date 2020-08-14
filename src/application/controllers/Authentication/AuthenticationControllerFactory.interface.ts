import CreateAuthenticationController from './CreateAuthentication.controller';
import VerifyAuthenticationController from './VerifyAuthentication.controller';

export default interface IAppointmentControllerFactory {
  createAuthentication: CreateAuthenticationController;
  verifyAuthentication: VerifyAuthenticationController;
}
