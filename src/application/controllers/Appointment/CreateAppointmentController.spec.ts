import FakeAppointmentRepository from '@infra/repositories/Appointment/FakeAppointment.repository';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointmentService from '@domain/services/Appointment/CreateAppointment.service';
import CreateAppointmentController from './CreateAppointment.controller';

describe('CreateAppointmentController', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );
    const createAppointmentController = new CreateAppointmentController(
      createAppointmentService,
      dateFnsDateHandler,
    );

    const appointment = {
      date: '2020-04-10T11:00:00',
      provider_id: '123',
    };

    expect(
      createAppointmentController.handle(appointment),
    ).resolves.not.toThrow();
  });
});
