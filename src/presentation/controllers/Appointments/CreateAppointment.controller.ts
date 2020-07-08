import { parseISO } from 'date-fns';

import CreateAppointment from '@domain/services/Appointments/CreateAppointment';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';

class CreateAppointmentController {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute(httpBody: any): IAppointment {
    const { provider_name, date } = httpBody;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointment(this.appointmentRepository);
    const appointment = createAppointment.execute({
      provider_name,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentController;
