import { startOfHour } from 'date-fns';

import FakeAppointmentRepository from '@infra/repositories/fake/FakeAppointment.repository';
import DateFnsDateHandler from '@utils/dateHandler/DateFnsDateHandler.adapter';
import CreateAppointment from './CreateAppointment.usecase';

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const dateFnsDateHandler = new DateFnsDateHandler();
    const createAppointment = new CreateAppointment(
      fakeAppointmentRepository,
      dateFnsDateHandler,
    );

    const testDate = new Date();
    const provider_id = '123';

    const appointment = await createAppointment.execute({
      date: testDate,
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toMatchObject({
      provider_id,
      date: startOfHour(testDate),
    });
  });
});
