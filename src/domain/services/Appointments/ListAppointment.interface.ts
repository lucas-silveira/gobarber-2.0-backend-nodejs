import IAppointment from '@domain/entities/Appointment.interface';

export interface IListAppointmentService {
  execute: () => Promise<IAppointment[]>;
}
