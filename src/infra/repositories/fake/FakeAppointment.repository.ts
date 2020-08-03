// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import IAppointment from '@domain/entities/Appointment.interface';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';

class TypeormAppointmentRepository implements IAppointmentRepository {
  private appointments: Required<IAppointment>[] = [];

  public async findAll(): Promise<IAppointment[]> {
    return Promise.resolve(this.appointments);
  }

  public async findByDate(date: Date): Promise<Required<IAppointment> | null> {
    const appointment = this.appointments.find(appmnt => appmnt.date === date);

    return Promise.resolve(appointment || null);
  }

  public async create(
    appointment: IAppointment,
  ): Promise<Required<IAppointment>> {
    const newAppointment = { ...appointment, id: faker.random.uuid() };
    this.appointments.push(newAppointment);
    return Promise.resolve(newAppointment);
  }
}

export default TypeormAppointmentRepository;
