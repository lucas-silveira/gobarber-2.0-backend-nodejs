export interface IListAppointmentController {
  handle: () => Promise<IListAppointmentController.Output[]>;
}

export namespace IListAppointmentController {
  export type Output = {
    provider_id: string;
    date: Date;
  };
}
