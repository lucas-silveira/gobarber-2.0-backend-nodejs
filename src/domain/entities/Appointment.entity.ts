import IAppointmentEntity from './AppointmentEntity.interface';

class Appointment implements IAppointmentEntity {
  public readonly provider_id: string;

  public readonly date: Date;

  constructor(provider_id: string, date: Date) {
    this.provider_id = provider_id;
    this.date = date;
  }
}

export default Appointment;
