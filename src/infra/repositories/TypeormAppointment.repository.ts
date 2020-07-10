import IAppointment from '@domain/entities/Appointment.interface';
import { IRepository } from './Repository.interface';

import TypeormAppointmentSchema from '../schemas/TypeormAppointment.schema';

class TypeormAppointmentRepository implements IRepository<IAppointment> {
  public async findAll(): Promise<IAppointment[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findOne(where: IRepository.Where): Promise<IAppointment | null> {
    const appointments = await TypeormAppointmentSchema.findOne({ where });
    return appointments || null;
  }

  public async create(appointment: IAppointment): Promise<IAppointment> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormAppointmentRepository;
