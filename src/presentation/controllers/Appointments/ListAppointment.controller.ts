import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IControllerAppointment } from './ControllerAppointment.interface';

class ListAppointmentController
  implements IControllerAppointment<Promise<IAppointment[]>> {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async handle(): Promise<IAppointment[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointmentController;
