import { isEqual } from 'date-fns';

import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from './Repository.interface';

class LocalAppointmentRepository implements IRepository {
  private appointments: IAppointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): IAppointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): IAppointment | null {
    const appointment = this.appointments.find(appt =>
      isEqual(date, appt.date),
    );

    if (!appointment) return null;

    return appointment;
  }

  public create(appointment: IAppointment): void {
    this.appointments.push(appointment);
  }
}

export default LocalAppointmentRepository;
