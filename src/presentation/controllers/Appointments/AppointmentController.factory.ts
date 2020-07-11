import TypeormAppointmentRepository from '@src/infra/repositories/Typeorm/TypeormAppointment.repository';
import DateHandler from '@src/utils/DateHandler/DateHandler';
import CreateAppointment from '@domain/services/Appointments/CreateAppointment.service';
import ListAppointment from '@src/domain/services/Appointments/ListAppointment.service';
import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const typeormAppointmentRepository = new TypeormAppointmentRepository();
  const createAppointment = new CreateAppointment(
    typeormAppointmentRepository,
    DateHandler,
  );
  const listAppointment = new ListAppointment(typeormAppointmentRepository);
  const createAppointmentController = new CreateAppointmentController(
    createAppointment,
    DateHandler,
  );
  const listAppointmentController = new ListAppointmentController(
    listAppointment,
  );

  return {
    createAppointment: createAppointmentController,
    listAppointment: listAppointmentController,
  };
};

export default appointmentControllerFactory;
