import { IListAppointment } from '@domain/services/Appointments/ListAppointment.interface';

export interface IListAppointmentController {
  handle: () => Promise<IListAppointmentController.Output[]>;
}

export namespace IListAppointmentController {
  export type Output = IListAppointment.Output;
}
