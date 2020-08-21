import IAppointmentEntity from './AppointmentEntity.interface';

class Appointment implements IAppointmentEntity {
  public id: string;

  public provider_id: string;

  public date: Date;
}

export default Appointment;
