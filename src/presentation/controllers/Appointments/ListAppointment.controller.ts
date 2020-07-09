import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IControllerAppointment } from './ControllerAppointment.interface';

class ListAppointmentController
  implements IControllerAppointment<Promise<IAppointment[]>> {
  private appointmentRepository: IRepository<IAppointment>;

  constructor(appointmentRepository: IRepository<IAppointment>) {
    this.appointmentRepository = appointmentRepository;
  }

  public async handle(): Promise<IAppointment[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointmentController;
