import IAppointment from '@domain/entities/Appointment.interface';

export default interface IRepository {
  findAll: () => IAppointment[];

  findByDate: (date: Date) => IAppointment | undefined;

  create: (appointment: IAppointment) => void;
}
