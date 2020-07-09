import Appointment from '@domain/entities/Appointment';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import DateHandlerAdapter from '@utils/DateHandler.adapter';
import { IAppointmentService } from './CreateAppointment.interface';

class CreateAppointment implements IAppointmentService {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    provider_name,
    date,
  }: IAppointmentService.Appointment): Promise<IAppointment> {
    const appointmentDate = DateHandlerAdapter.startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked.');

    const appointment = new Appointment(provider_name, appointmentDate);
    await this.appointmentRepository.create(appointment);
    return appointment;
  }
}

export default CreateAppointment;
