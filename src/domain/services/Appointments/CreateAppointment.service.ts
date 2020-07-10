import Appointment from '@domain/entities/Appointment';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import DateHandler from '@src/utils/DateHandler/DateHandler';
import { ICreateAppointmentService } from './CreateAppointment.interface';

class CreateAppointment implements ICreateAppointmentService {
  private appointmentRepository: IRepository<IAppointment>;

  constructor(appointmentRepository: IRepository<IAppointment>) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    provider_id,
    date,
  }: ICreateAppointmentService.Input): Promise<
    ICreateAppointmentService.Output
  > {
    const appointmentDate = DateHandler.startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findOne({
      date: appointmentDate,
    });

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked.');

    const appointment = new Appointment(provider_id, appointmentDate);
    const newAppointment = await this.appointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default CreateAppointment;
