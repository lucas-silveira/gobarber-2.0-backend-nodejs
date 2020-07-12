import { IListAppointmentService } from '@domain/services/Appointments/ListAppointment.interface';
import { IListAppointmentController } from './ListAppointmentController.interface';

class ListAppointmentController implements IListAppointmentController {
  private listAppointment: IListAppointmentService;

  constructor(listAppointment: IListAppointmentService) {
    this.listAppointment = listAppointment;
  }

  public async handle(): Promise<IListAppointmentService.Output[]> {
    return this.listAppointment.execute();
  }
}

export default ListAppointmentController;
