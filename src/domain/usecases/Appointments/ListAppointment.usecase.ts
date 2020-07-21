import IAppointmentRepository from '@infra/repositories/AppointmentRepository.interface';
import { IListAppointment } from './ListAppointment.interface';

class ListAppointment implements IListAppointment {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute(): Promise<IListAppointment.Output[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointment;
