import IAppointmentEntity from './AppointmentEntity.interface';

class Appointment implements IAppointmentEntity {
  public readonly id: string;

  public readonly provider_id: string;

  public readonly date: Date;

  constructor(id: string, provider_id: string, date: Date) {
    this.id = id;
    this.provider_id = provider_id;
    this.date = date;
  }
}

export default Appointment;
