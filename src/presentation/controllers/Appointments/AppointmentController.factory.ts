import TypeormAppointmentRepository from '@src/infra/repositories/Typeorm/TypeormAppointment.repository';
import AppointmentRepository from '@infra/repositories/Appointment.repository';
import CreateAppointmentController from '@presentation/controllers/Appointments/CreateAppointment.controller';
import ListAppointmentController from '@presentation/controllers/Appointments/ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const typeormAppointmentRepository = new TypeormAppointmentRepository();
  const appointmentRepository = new AppointmentRepository(
    typeormAppointmentRepository,
  );
  const createAppointment = new CreateAppointmentController(
    appointmentRepository,
  );

  const listAppointment = new ListAppointmentController(appointmentRepository);

  return {
    createAppointment,
    listAppointment,
  };
};

export default appointmentControllerFactory;
