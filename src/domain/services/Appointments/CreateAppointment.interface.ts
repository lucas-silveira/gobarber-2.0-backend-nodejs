import IAppointment from '@domain/entities/Appointment.interface';

export interface ICreateAppointmentService {
  execute: (
    appointment: ICreateAppointmentService.Appointment,
  ) => Promise<IAppointment>;
}

export namespace ICreateAppointmentService {
  export type Appointment = {
    provider_name: string;
    date: Date;
  };
}
