import { parseISO } from 'date-fns';

import CreateAppointment from '@domain/services/Appointments/CreateAppointment.service';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IAppointmentController } from './AppointmentController.interface';

class CreateAppointmentController
  implements IAppointmentController<Promise<IAppointment>> {
  private appointmentRepository: IRepository<IAppointment>;

  constructor(appointmentRepository: IRepository<IAppointment>) {
    this.appointmentRepository = appointmentRepository;
  }

  public async handle(
    httpBody: IAppointmentController.httpBody,
  ): Promise<IAppointment> {
    const { provider_id, date } = httpBody;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointment(this.appointmentRepository);
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentController;
