import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';

export default interface IAppointmentRepository {
  findAll: () => Promise<IAppointmentEntity[]>;
  findByDate: (date: Date) => Promise<Required<IAppointmentEntity> | null>;
  create: (entity: IAppointmentEntity) => Promise<Required<IAppointmentEntity>>;
}
