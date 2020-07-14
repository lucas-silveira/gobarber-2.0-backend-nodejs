import Appointment from '@domain/entities/Appointment';
import IDateHandler from '@utils/DateHandler/DateHandler.interface';
import IAppointmentRepository from '@infra/repositories/AppointmentRepository.interface';
import CustomError from '@domain/entities/Error';
import { ICreateAppointmentService } from './CreateAppointment.interface';

class CreateAppointment implements ICreateAppointmentService {
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
  }: ICreateAppointmentService.Input): Promise<
    ICreateAppointmentService.Output
  > {
    const appointmentDate = this.dateHandler.startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findOne({
      date: appointmentDate,
    });

    if (findAppointmentInSameDate)
      throw new CustomError('error', 'This appointment is already booked.');

    const appointment = new Appointment(provider_id, appointmentDate);
    const newAppointment = await this.appointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default CreateAppointment;
