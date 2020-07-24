import { ICreateAppointment } from '@domain/usecases/Appointments/CreateAppointment.interface';

export interface ICreateAppointmentController {
  handle: (
    data: ICreateAppointmentController.Input,
  ) => Promise<ICreateAppointmentController.Output>;
}

export namespace ICreateAppointmentController {
  export type Input = {
    provider_id: string;
    date: string;
  };

  export type Output = ICreateAppointment.Output;
}
