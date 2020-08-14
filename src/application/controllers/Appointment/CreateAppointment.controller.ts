import { ICreateAppointmentService } from '@domain/services/Appointment/CreateAppointmentService.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import { ICreateAppointmentController } from './CreateAppointmentController.interface';

class CreateAppointmentController implements ICreateAppointmentController {
  private createAppointmentService: ICreateAppointmentService;

  private dateHandler: IDateHandler;

  constructor(
    createAppointmentService: ICreateAppointmentService,
    dateHandler: IDateHandler,
  ) {
    this.createAppointmentService = createAppointmentService;
    this.dateHandler = dateHandler;
  }

  public async handle(data: ICreateAppointmentController.Input): Promise<void> {
    const { provider_id, date } = data;
    const parsedDate =
      date instanceof Date ? date : this.dateHandler.parseISO(date);
    await this.createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });
  }
}

export default CreateAppointmentController;
