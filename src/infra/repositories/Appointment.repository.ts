import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from './Repository.interface';

class AppointmentRepository implements IRepository {
  private dbAppointment: IRepository;

  constructor(dbAppointment: IRepository) {
    this.dbAppointment = dbAppointment;
  }

  public async findAll(): Promise<IAppointment[]> {
    return this.dbAppointment.findAll();
  }

  public async findByDate(date: Date): Promise<IAppointment | null> {
    return this.dbAppointment.findByDate(date);
  }

  public async create(appointment: IAppointment): Promise<IAppointment> {
    return this.dbAppointment.create(appointment);
  }
}

export default AppointmentRepository;
