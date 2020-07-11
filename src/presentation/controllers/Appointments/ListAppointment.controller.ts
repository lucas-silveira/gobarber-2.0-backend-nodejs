import IAppointment from '@domain/entities/Appointment.interface';
import { IListAppointmentService } from '@domain/services/Appointments/ListAppointment.interface';
import { IAppointmentController } from './AppointmentController.interface';

class ListAppointmentController
  implements IAppointmentController<Promise<IListAppointmentService.Output[]>> {
  private listAppointment: IListAppointmentService;

  constructor(listAppointment: IListAppointmentService) {
    this.listAppointment = listAppointment;
  }

  public async handle(): Promise<IAppointment[]> {
    return this.listAppointment.execute();
  }
}

export default ListAppointmentController;
