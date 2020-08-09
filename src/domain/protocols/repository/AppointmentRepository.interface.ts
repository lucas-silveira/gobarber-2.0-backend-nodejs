export interface IAppointmentRepository {
  findAll: () => Promise<IAppointmentRepository.AppointmentData[]>;
  findByDate: (
    date: Date,
  ) => Promise<IAppointmentRepository.AppointmentData | null>;
  create: (
    entity: IAppointmentRepository.AppointmentEntity,
  ) => Promise<IAppointmentRepository.AppointmentData>;
}

export namespace IAppointmentRepository {
  export type AppointmentEntity = {
    provider_id: string;
    date: Date;
  };

  export type AppointmentData = {
    id: string;
    provider_id: string;
    date: Date;
  };
}
