import IController from '../Controller.interface';

export type ICreateAppointmentController = IController<
  ICreateAppointmentController.Input,
  Promise<void>
>;

export namespace ICreateAppointmentController {
  export type Input = {
    provider_id: string;
    date: string | Date;
  };
}
