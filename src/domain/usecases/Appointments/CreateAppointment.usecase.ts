import Appointment from '@domain/entities/Appointment';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';
import CustomError from '@domain/entities/Error';
import { ICreateAppointment } from './CreateAppointment.interface';

class CreateAppointment implements ICreateAppointment {
  private appointmentRepository: IAppointmentRepository;

  private dateHandler: IDateHandler;

  constructor(
    appointmentRepository: IAppointmentRepository,
    dateHandler: IDateHandler,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.dateHandler = dateHandler;
  }

  public async execute({
    provider_id,
    date,
  }: ICreateAppointment.Input): Promise<ICreateAppointment.Output> {
    const appointmentDate = this.dateHandler.startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new CustomError('error', 'This appointment is already booked.');

    const appointment = new Appointment(provider_id, appointmentDate);
    const newAppointment = await this.appointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default CreateAppointment;
