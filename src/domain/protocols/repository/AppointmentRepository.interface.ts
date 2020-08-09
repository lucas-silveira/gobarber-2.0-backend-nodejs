import IAppointment from '@domain/entities/AppointmentEntity.interface';

export interface IAppointmentRepository {
  findAll: () => Promise<IAppointment[]>;
  findByDate: (date: Date) => Promise<IAppointment | null>;
  create: (entity: IAppointment) => Promise<IAppointment>;
}
