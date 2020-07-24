import { IListAppointment } from '@domain/usecases/Appointments/ListAppointment.interface';

export interface IListAppointmentController {
  handle: () => Promise<IListAppointmentController.Output[]>;
}

export namespace IListAppointmentController {
  export type Output = IListAppointment.Output;
}
