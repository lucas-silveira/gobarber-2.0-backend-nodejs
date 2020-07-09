import IAppointment from './Appointment.interface';

class Appointment implements IAppointment {
  public readonly provider_name: string;

  public readonly date: Date;

  constructor(provider_name: string, date: Date) {
    this.provider_name = provider_name;
    this.date = date;
  }
}

export default Appointment;
