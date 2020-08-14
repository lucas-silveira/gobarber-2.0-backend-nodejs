import TypeormAppointmentRepository from '@infra/repositories/Appointment/TypeormAppointment.repository';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointmentService from '@domain/services/Appointment/CreateAppointment.service';
import CreateAppointmentController from './CreateAppointment.controller';
import ListAppointmentController from './ListAppointment.controller';
import IAppointmentControllerFactory from './AppointmentControllerFactory.interface';

const appointmentControllerFactory = (): IAppointmentControllerFactory => {
  const typeormAppointmentRepository = new TypeormAppointmentRepository();
  const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
  const createAppointmentService = new CreateAppointmentService(
    typeormAppointmentRepository,
    dateFnsDateHandler,
  );
  const createAppointmentController = new CreateAppointmentController(
    createAppointmentService,
    dateFnsDateHandler,
  );
  const listAppointmentController = new ListAppointmentController(
    typeormAppointmentRepository,
  );

  return {
    createAppointment: createAppointmentController,
    listAppointment: listAppointmentController,
  };
};

export default appointmentControllerFactory;
