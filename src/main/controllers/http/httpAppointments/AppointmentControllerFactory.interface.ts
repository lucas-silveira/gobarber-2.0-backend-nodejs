import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';

export default interface IAppointmentControllerFactory {
  createAppointment: CreateAppointmentController;
  listAppointment: ListAppointmentController;
}
