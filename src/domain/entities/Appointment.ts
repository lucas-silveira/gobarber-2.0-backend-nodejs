import IAppointment from './Appointment.interface';

class Appointment implements IAppointment {
  public readonly provider_id: string;

  public readonly date: Date;

  constructor(provider_id: string, date: Date) {
    this.provider_id = provider_id;
    this.date = date;
  }
}

export default Appointment;
