import { ICreateAppointmentService } from '@domain/usecases/Appointments/CreateAppointment.interface';

export interface ICreateAppointmentController {
  handle: (
    body: ICreateAppointmentController.Body,
  ) => Promise<ICreateAppointmentService.Output>;
}

export namespace ICreateAppointmentController {
  export interface Body {
    provider_id: string;
    date: string;
  }
}
