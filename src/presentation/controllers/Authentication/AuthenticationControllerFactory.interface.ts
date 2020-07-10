import CreateAuthenticationController from './CreateAuthentication.controller';

export default interface IAppointmentControllerFactory {
  createAuthentication: CreateAuthenticationController;
}
