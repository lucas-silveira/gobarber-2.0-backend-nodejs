import CreateAppointmentController from '@presentation/controllers/Appointments/CreateAppointment.controller';
import ListAppointmentController from '@presentation/controllers/Appointments/ListAppointment.controller';

export default interface IAppointmentControllerFactory {
  createAppointment: CreateAppointmentController;
  listAppointment: ListAppointmentController;
}
