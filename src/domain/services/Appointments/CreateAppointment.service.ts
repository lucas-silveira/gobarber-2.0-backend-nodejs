import AppointmentEntity from '@domain/entities/Appointment.entity';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { ICreateAppointmentService } from './CreateAppointmentService.interface';

class CreateAppointmentService implements ICreateAppointmentService {
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
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new ErrorExcepetion('error', 'This appointment is already booked.');

    const appointment = new AppointmentEntity(provider_id, appointmentDate);
    const newAppointment = await this.appointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default CreateAppointmentService;
