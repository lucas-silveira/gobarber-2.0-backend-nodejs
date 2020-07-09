import IAppointment from '@domain/entities/Appointment.interface';

export default interface IRepository {
  findAll: () => Promise<IAppointment[]>;
  findByDate: (date: Date) => Promise<IAppointment | null>;
  create: (appointment: IAppointment) => Promise<IAppointment>;
}
