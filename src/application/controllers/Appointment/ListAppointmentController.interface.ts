import IController from '../Controller.interface';

export type IListAppointmentController = IController<
  any,
  Promise<IListAppointmentController.Output[]>
>;

export namespace IListAppointmentController {
  export type Output = {
    provider_id: string;
    date: Date;
  };
}
