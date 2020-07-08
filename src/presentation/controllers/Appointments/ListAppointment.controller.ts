import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';

class ListAppointmentController {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute(): IAppointment[] {
    return this.appointmentRepository.findAll();
  }
}

export default ListAppointmentController;
