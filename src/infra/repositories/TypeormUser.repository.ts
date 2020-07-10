import IUser from '@domain/entities/User.interface';
import { IRepository } from './Repository.interface';

import TypeormUserSchema from '../schemas/TypeormUser.schema';

class TypeormUserRepository implements IRepository<IUser> {
  public async findAll(): Promise<IUser[]> {
    return TypeormUserSchema.find();
  }

  public async findOne(where: IRepository.Where): Promise<IUser | null> {
    const users = await TypeormUserSchema.findOne({ where });
    return users || null;
  }

  public async create(user: IUser): Promise<IUser> {
    const newUser = TypeormUserSchema.create(user);
    await TypeormUserSchema.save(newUser);
    return newUser;
  }
}

export default TypeormUserRepository;
