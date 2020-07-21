export interface ICreateAppointment {
  execute: (
    appointment: ICreateAppointment.Input,
  ) => Promise<ICreateAppointment.Output>;
}

export namespace ICreateAppointment {
  export type Input = {
    provider_id: string;
    date: Date;
  };

  export type Output = Input;
}
