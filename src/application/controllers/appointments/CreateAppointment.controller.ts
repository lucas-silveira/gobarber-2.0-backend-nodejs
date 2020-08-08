import { ICreateAppointment } from '@domain/services/Appointments/CreateAppointment.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import { ICreateAppointmentController } from './CreateAppointmentController.interface';

class CreateAppointmentController implements ICreateAppointmentController {
  private createAppointment: ICreateAppointment;

  private dateHandler: IDateHandler;

  constructor(
    createAppointment: ICreateAppointment,
    dateHandler: IDateHandler,
  ) {
    this.createAppointment = createAppointment;
    this.dateHandler = dateHandler;
  }

  public async handle(
    data: ICreateAppointmentController.Input,
  ): Promise<ICreateAppointmentController.Output> {
    const { provider_id, date } = data;
    const parsedDate = this.dateHandler.parseISO(date);
    const appointment = await this.createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentController;
