export interface IAppointmentController<T> {
  handle: (body: IAppointmentController.Body) => T;
}

export namespace IAppointmentController {
  export interface Body {
    provider_id: string;
    date: string;
  }
}
