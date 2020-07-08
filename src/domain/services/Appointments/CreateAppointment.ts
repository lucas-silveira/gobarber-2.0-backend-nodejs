import { startOfHour } from 'date-fns';

import Appointment from '@domain/entities/Appointment';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IAppointmentDomain } from './CreateAppointment.interface';

class CreateAppointment implements IAppointmentDomain {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({
    provider_name,
    date,
  }: IAppointmentDomain.Appointment): IAppointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked.');

    const appointment = new Appointment(provider_name, appointmentDate);

    this.appointmentRepository.create(appointment);

    return appointment;
  }
}

export default CreateAppointment;
