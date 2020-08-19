import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import IService from '../Service.interface';

export type ICreateAppointmentService = IService<
  ICreateAppointmentService.Input,
  Promise<ICreateAppointmentService.Output>
>;

export namespace ICreateAppointmentService {
  export type Input = {
    provider_id: string;
    date: Date;
  };

  export type Output = IAppointmentEntity;
}
