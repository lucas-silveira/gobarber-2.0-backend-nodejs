import TypeormAppointmentRepository from '@infra/repositories/Typeorm/TypeormAppointment.repository';
import DateFnsDateHandler from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointment from '@domain/usecases/Appointments/CreateAppointment.usecase';
import ListAppointment from '@domain/usecases/Appointments/ListAppointment.usecase';
import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const typeormAppointmentRepository = new TypeormAppointmentRepository();
  const dateFnsDateHandler = new DateFnsDateHandler();
  const createAppointment = new CreateAppointment(
    typeormAppointmentRepository,
    dateFnsDateHandler,
  );
  const listAppointment = new ListAppointment(typeormAppointmentRepository);
  const createAppointmentController = new CreateAppointmentController(
    createAppointment,
    dateFnsDateHandler,
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
