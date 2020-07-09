import IUser from '@domain/entities/User.interface';
import IRepository from './Repository.interface';

import TypeormUserSchema from '../schemas/TypeormUser.schema';

class TypeormUserRepository implements IRepository<IUser> {
  public async findAll(): Promise<IUser[]> {
    return TypeormUserSchema.find();
  }

  public async findByDate(date: Date): Promise<IUser | null> {
    const appointments = await TypeormUserSchema.findOne({
      where: { date },
    });
    return appointments || null;
  }

  public async create(appointment: IUser): Promise<IUser> {
    const newAppointment = TypeormUserSchema.create(appointment);
    await TypeormUserSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormUserRepository;
