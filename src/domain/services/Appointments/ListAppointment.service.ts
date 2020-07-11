import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IListAppointmentService } from './ListAppointment.interface';

class ListAppointment implements IListAppointmentService {
  private appointmentRepository: IRepository<
    IAppointment,
    Required<IAppointment>
  >;

  constructor(
    appointmentRepository: IRepository<IAppointment, Required<IAppointment>>,
  ) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute(): Promise<IListAppointmentService.Output[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointment;
