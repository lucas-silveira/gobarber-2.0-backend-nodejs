import IAppointment from '@domain/entities/Appointment.interface';

export default interface IListAppointmentService {
  execute: () => Promise<IAppointment[]>;
}
