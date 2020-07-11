import IAppointment from '@domain/entities/Appointment.interface';
import { ICreateAppointmentService } from '@domain/services/Appointments/CreateAppointment.interface';
import IDateHandler from '@src/utils/DateHandler/DateHandler.interface';
import { IAppointmentController } from './AppointmentController.interface';

class CreateAppointmentController
  implements IAppointmentController<Promise<ICreateAppointmentService.Output>> {
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
    body: IAppointmentController.Body,
  ): Promise<IAppointment> {
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
