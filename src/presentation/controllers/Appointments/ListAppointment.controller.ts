import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';
import ListAppointment from '@domain/services/Appointments/ListAppointment.service';
import { IListAppointmentService } from '@domain/services/Appointments/ListAppointment.interface';
import { IAppointmentController } from './AppointmentController.interface';

class ListAppointmentController
  implements IAppointmentController<Promise<IListAppointmentService.Output[]>> {
  private appointmentRepository: IRepository<IAppointment>;

  constructor(appointmentRepository: IRepository<IAppointment>) {
    this.appointmentRepository = appointmentRepository;
  }

  public async handle(): Promise<IAppointment[]> {
    const createAppointment = new ListAppointment(this.appointmentRepository);
    return createAppointment.execute();
  }
}

export default ListAppointmentController;
