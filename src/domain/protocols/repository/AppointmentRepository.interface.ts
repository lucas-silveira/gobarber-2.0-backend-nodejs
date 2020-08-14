import IAppointment from '@domain/entities/AppointmentEntity.interface';

export interface IAppointmentRepository {
  findAll: () => Promise<IAppointment[]>;
  findByDate: (date: Date) => Promise<IAppointment | null>;
  create: (
    appointmentDTO: IAppointmentRepository.createInput,
  ) => Promise<IAppointment>;
}

export namespace IAppointmentRepository {
  export type createInput = {
    provider_id: string;
    date: Date;
  };
}
