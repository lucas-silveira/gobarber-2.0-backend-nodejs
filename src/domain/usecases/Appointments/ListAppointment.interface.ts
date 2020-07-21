export interface IListAppointment {
  execute: () => Promise<IListAppointment.Output[]>;
}

export namespace IListAppointment {
  export type Output = {
    provider_id: string;
    date: Date;
  };
}
