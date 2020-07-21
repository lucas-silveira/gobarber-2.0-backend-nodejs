import { IListAppointment } from '@domain/usecases/Appointments/ListAppointment.interface';

export interface IListAppointmentController {
  handle: () => Promise<IListAppointment.Output[]>;
}
