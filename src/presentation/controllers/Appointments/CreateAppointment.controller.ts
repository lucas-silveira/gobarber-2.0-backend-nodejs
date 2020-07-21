import { ICreateAppointment } from '@domain/usecases/Appointments/CreateAppointment.interface';
import IDateHandler from '@utils/DateHandler/DateHandler.interface';
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
    body: ICreateAppointmentController.Body,
  ): Promise<ICreateAppointment.Output> {
    const { provider_id, date } = body;
    const parsedDate = this.dateHandler.parseISO(date);
    const appointment = await this.createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentController;
