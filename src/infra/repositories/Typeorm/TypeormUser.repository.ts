import IUser from '@domain/entities/User.interface';
import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import IUserRepository from '@domain/protocols/repositories/UserRepository.interface';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<Required<IUser>[]> {
    return TypeormUserSchema.find();
  }

  public async findOne(where: Partial<IUser>): Promise<Required<IUser> | null> {
    const users = await TypeormUserSchema.findOne({ where });
    return users || null;
  }

  public async create(user: IUser): Promise<Required<IUser>> {
    const newUser = TypeormUserSchema.create(user);
    await TypeormUserSchema.save(newUser);
    return newUser;
  }

  public async update(user: Required<IUser>): Promise<Required<IUser>> {
    const userSchema = user as any; // work around
    await TypeormUserSchema.save(userSchema);
    return user;
  }
}

export default TypeormUserRepository;
