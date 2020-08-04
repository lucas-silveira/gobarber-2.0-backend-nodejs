import FakeAppointmentRepository from '@infra/repositories/fake/FakeAppointment.repository';
import DateFnsDateHandler from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointment from './CreateAppointment.usecase';
import ListAppointment from './ListAppointment.usecase';

describe('Create Appointment', () => {
  it('should be able to list the created appointments', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandler();
    const createAppointment = new CreateAppointment(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );

    const listAppointment = new ListAppointment(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);
    const provider_id = '123';

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id,
    });

    const appointments = await listAppointment.execute();
    expect(appointments).toEqual(expect.arrayContaining([appointment]));
  });
});
