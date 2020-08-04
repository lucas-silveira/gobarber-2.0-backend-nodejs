import IUser from '@domain/entities/User.interface';
import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<Required<IUser>[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<Required<IUser> | null> {
    const user = await TypeormUserSchema.findOne({ where: { id } });
    return user || null;
  }

  public async findByEmail(email: string): Promise<Required<IUser> | null> {
    const user = await TypeormUserSchema.findOne({ where: { email } });
    return user || null;
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
