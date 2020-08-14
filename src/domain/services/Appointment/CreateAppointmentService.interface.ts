import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';

export interface ICreateAppointmentService {
  execute: (
    appointment: ICreateAppointmentService.Input,
  ) => Promise<ICreateAppointmentService.Output>;
}

export namespace ICreateAppointmentService {
  export type Input = {
    provider_id: string;
    date: Date;
  };

  export type Output = IAppointmentEntity;
}
