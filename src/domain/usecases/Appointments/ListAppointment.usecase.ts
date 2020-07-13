import IAppointmentRepository from '@infra/repositories/AppointmentRepository.interface';
import { IListAppointmentService } from './ListAppointment.interface';

class ListAppointment implements IListAppointmentService {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute(): Promise<IListAppointmentService.Output[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointment;
