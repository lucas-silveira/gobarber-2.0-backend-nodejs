import IAppointment from '@domain/entities/Appointment.interface';

export interface IAppointmentService {
  execute: (
    appointment: IAppointmentService.Appointment,
  ) => Promise<IAppointment>;
}

export namespace IAppointmentService {
  export type Appointment = {
    provider_name: string;
    date: Date;
  };
}
