import { isEqual } from 'date-fns';

import IRepository from './Repository.interface';
import IAppointment from '../entities/Appointment.interface';

class Repository implements IRepository {
  private appointments: IAppointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): IAppointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): IAppointment | undefined {
    return this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
  }

  public create(appointment: IAppointment): void {
    this.appointments.push(appointment);
  }
}

export default Repository;
