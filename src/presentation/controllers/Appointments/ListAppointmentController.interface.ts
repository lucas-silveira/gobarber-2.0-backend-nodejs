import { IListAppointmentService } from '@src/domain/services/Appointments/ListAppointment.interface';

export interface IListAppointmentController {
  handle: () => Promise<IListAppointmentService.Output[]>;
}
