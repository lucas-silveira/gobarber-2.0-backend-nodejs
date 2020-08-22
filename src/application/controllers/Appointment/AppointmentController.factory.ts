import { container } from 'tsyringe';
import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const createAppointmentController = container.resolve(
    CreateAppointmentController,
  );
  const listAppointmentController = container.resolve(
    ListAppointmentController,
  );

  return {
    createAppointment: createAppointmentController,
    listAppointment: listAppointmentController,
  };
};

export default appointmentControllerFactory;
