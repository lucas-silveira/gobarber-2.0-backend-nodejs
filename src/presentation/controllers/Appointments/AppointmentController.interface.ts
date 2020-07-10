export interface IAppointmentController<T> {
  handle: (httpBody: IAppointmentController.httpBody) => T;
}

export namespace IAppointmentController {
  export interface httpBody {
    provider_id: string;
    date: string;
  }
}
