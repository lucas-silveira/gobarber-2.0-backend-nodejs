import { IListAppointment } from '@domain/usecases/Appointments/ListAppointment.interface';
import { IListAppointmentController } from './ListAppointmentController.interface';

class ListAppointmentController implements IListAppointmentController {
  private listAppointment: IListAppointment;

  constructor(listAppointment: IListAppointment) {
    this.listAppointment = listAppointment;
  }

  public async handle(): Promise<IListAppointment.Output[]> {
    return this.listAppointment.execute();
  }
}

export default ListAppointmentController;
