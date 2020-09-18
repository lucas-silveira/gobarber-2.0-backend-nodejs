import { inject, injectable } from 'tsyringe';
import { IDateHandler } from '@domain/protocols/utils/DateHandler.interface';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { ICreateAppointmentService } from './CreateAppointmentService.interface';

@injectable()
class CreateAppointmentService implements ICreateAppointmentService {
  private appointmentRepository: IAppointmentRepository;

  private dateHandler: IDateHandler;

  constructor(
    @inject('AppointmentRepository')
    appointmentRepository: IAppointmentRepository,
    @inject('DateHandler')
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

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
