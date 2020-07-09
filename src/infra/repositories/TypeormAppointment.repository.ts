import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from './Repository.interface';

import TypeormAppointmentSchema from '../schemas/TypeormAppointment.schema';

class TypeormAppointmentRepository implements IRepository {
  public async findAll(): Promise<IAppointment[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(date: Date): Promise<IAppointment | null> {
    const appointments = await TypeormAppointmentSchema.findOne({
      where: { date },
    });
    return appointments || null;
  }

  public async create(appointment: IAppointment): Promise<void> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
  }
}

export default TypeormAppointmentRepository;
