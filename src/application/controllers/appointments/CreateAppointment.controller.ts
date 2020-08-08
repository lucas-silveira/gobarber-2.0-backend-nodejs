import { ICreateAppointmentService } from '@domain/services/Appointments/CreateAppointmentService.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import { ICreateAppointmentController } from './CreateAppointmentController.interface';

class CreateAppointmentController implements ICreateAppointmentController {
  private createAppointment: ICreateAppointmentService;

  private dateHandler: IDateHandler;

  constructor(
    createAppointment: ICreateAppointmentService,
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
