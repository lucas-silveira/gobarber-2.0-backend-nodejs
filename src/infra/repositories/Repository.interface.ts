import IAppointment from '@domain/entities/Appointment.interface';

export default interface IRepository {
  findAll: () => IAppointment[];
  findByDate: (date: Date) => IAppointment | null;
  create: (appointment: IAppointment) => void;
}
