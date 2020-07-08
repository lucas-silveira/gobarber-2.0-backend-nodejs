import IAppointment from '@domain/entities/Appointment.interface';

export interface IAppointmentDomain {
  execute: (appointment: IAppointmentDomain.Appointment) => IAppointment;
}

export namespace IAppointmentDomain {
  export type Appointment = {
    provider_name: string;
    date: Date;
  };
}
