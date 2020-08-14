import FakeAppointmentRepository from '@infra/repositories/Appointment/FakeAppointment.repository';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointment from '@domain/services/Appointment/CreateAppointment.service';
import ListAppointmentController from './ListAppointment.controller';

describe('List Appointment', () => {
  it('should be able to list the created appointments', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    const createAppointment = new CreateAppointment(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );

    const listAppointmentController = new ListAppointmentController(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);
    const provider_id = '123';

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id,
    });

    const appointments = await listAppointmentController.handle();
    expect(appointments).toEqual(expect.arrayContaining([appointment]));
  });
});
