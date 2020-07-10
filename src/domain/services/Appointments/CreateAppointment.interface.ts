import IAppointment from '@domain/entities/Appointment.interface';

export default interface ICreateAppointmentService {
  execute: (appointment: IAppointment) => Promise<IAppointment>;
}
