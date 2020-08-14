import { startOfHour } from 'date-fns';

import FakeAppointmentRepository from '@infra/repositories/Appointment/FakeAppointment.repository';
import DateFnsDateHandlerAdapter from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointment from './CreateAppointment.service';

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    const createAppointment = new CreateAppointment(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);
    const provider_id = '123';

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toMatchObject({
      provider_id,
      date: startOfHour(appointmentDate),
    });
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandlerAdapter();
    const createAppointment = new CreateAppointment(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);
    const provider_id = '123';

    await createAppointment.execute({
      date: appointmentDate,
      provider_id,
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
