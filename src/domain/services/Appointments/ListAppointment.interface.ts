export interface IListAppointmentService {
  execute: () => Promise<IListAppointmentService.Output[]>;
}

export namespace IListAppointmentService {
  export type Output = {
    provider_id: string;
    date: Date;
  };
}
