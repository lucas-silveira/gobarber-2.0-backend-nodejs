import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from './Repository.interface';

class AppointmentRepository implements IRepository {
  private dbAppointment: IRepository;

  constructor(dbAppointment: IRepository) {
    this.dbAppointment = dbAppointment;
  }

  public findAll(): IAppointment[] {
    return this.dbAppointment.findAll();
  }

  public findByDate(date: Date): IAppointment | null {
    return this.dbAppointment.findByDate(date);
  }

  public create(appointment: IAppointment): void {
    this.dbAppointment.create(appointment);
  }
}

export default AppointmentRepository;
