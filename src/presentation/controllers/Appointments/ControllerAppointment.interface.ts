export interface IControllerAppointment<T> {
  handle: (httpBody: IControllerAppointment.httpBody) => T;
}

export namespace IControllerAppointment {
  export interface httpBody {
    provider_name: string;
    date: string;
  }
}
