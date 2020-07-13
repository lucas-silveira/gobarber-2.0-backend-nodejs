import { IListAppointmentService } from '@domain/usecases/Appointments/ListAppointment.interface';

export interface IListAppointmentController {
  handle: () => Promise<IListAppointmentService.Output[]>;
}
