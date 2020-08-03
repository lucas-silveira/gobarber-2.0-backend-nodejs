import IAppointment from '@domain/entities/Appointment.interface';

export default interface IAppointmentRepository {
  findAll: () => Promise<IAppointment[]>;
  findByDate: (date: Date) => Promise<Required<IAppointment> | null>;
  create: (entity: IAppointment) => Promise<Required<IAppointment>>;
}
