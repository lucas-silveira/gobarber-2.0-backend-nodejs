import { injectable, inject } from 'tsyringe';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import { IListAppointmentController } from './ListAppointmentController.interface';

@injectable()
class ListAppointmentController implements IListAppointmentController {
  private appointmentRepository: IAppointmentRepository;

  constructor(
    @inject('AppointmentRepository')
    appointmentRepository: IAppointmentRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
  }

  public async handle(): Promise<IListAppointmentController.Output[]> {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointmentController;
