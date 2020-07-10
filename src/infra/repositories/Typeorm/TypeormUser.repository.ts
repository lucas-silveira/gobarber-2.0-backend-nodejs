import IUser from '@domain/entities/User.interface';
import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import IRepository from '../Repository.interface';

class TypeormUserRepository implements IRepository<IUser> {
  public async findAll(): Promise<IUser[]> {
    return TypeormUserSchema.find();
  }

  public async findOne(where: Partial<IUser>): Promise<IUser | null> {
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
