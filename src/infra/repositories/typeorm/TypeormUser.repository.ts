import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<IUserRepository.UserData[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<IUserRepository.UserData | null> {
    const user = await TypeormUserSchema.findOne({ where: { id } });
    return user || null;
  }

  public async findByEmail(
    email: string,
  ): Promise<IUserRepository.UserData | null> {
    const user = await TypeormUserSchema.findOne({ where: { email } });
    return user || null;
  }

  public async create(
    user: IUserRepository.UserEntity,
  ): Promise<IUserRepository.UserData> {
    const newUser = TypeormUserSchema.create(user);
    await TypeormUserSchema.save(newUser);
    return newUser;
  }

  public async update(
    user: IUserRepository.UserData,
  ): Promise<IUserRepository.UserData> {
    const userSchema = user as any; // work around
    await TypeormUserSchema.save(userSchema);
    return user;
  }
}

export default TypeormUserRepository;
