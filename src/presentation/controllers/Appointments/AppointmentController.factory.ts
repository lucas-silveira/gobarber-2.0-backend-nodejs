import TypeormAppointmentRepository from '@src/infra/repositories/Typeorm/TypeormAppointment.repository';
import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const typeormAppointmentRepository = new TypeormAppointmentRepository();
  const createAppointment = new CreateAppointmentController(
    typeormAppointmentRepository,
  );

  const listAppointment = new ListAppointmentController(
    typeormAppointmentRepository,
  );

  return {
    createAppointment,
    listAppointment,
  };
};

export default appointmentControllerFactory;
