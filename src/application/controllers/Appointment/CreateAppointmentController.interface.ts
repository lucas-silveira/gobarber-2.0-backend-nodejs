export interface ICreateAppointmentController {
  handle: (data: ICreateAppointmentController.Input) => Promise<void>;
}

export namespace ICreateAppointmentController {
  export type Input = {
    provider_id: string;
    date: string | Date;
  };
}
