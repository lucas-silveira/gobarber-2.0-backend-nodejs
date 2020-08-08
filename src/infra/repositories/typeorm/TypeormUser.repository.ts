import IUserEntity from '@domain/entities/UserEntity.interface';
import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<Required<IUserEntity>[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<Required<IUserEntity> | null> {
    const user = await TypeormUserSchema.findOne({ where: { id } });
    return user || null;
  }

  public async findByEmail(
    email: string,
  ): Promise<Required<IUserEntity> | null> {
    const user = await TypeormUserSchema.findOne({ where: { email } });
    return user || null;
  }

  public async create(user: IUserEntity): Promise<Required<IUserEntity>> {
    const newUser = TypeormUserSchema.create(user);
    await TypeormUserSchema.save(newUser);
    return newUser;
  }

  public async update(
    user: Required<IUserEntity>,
  ): Promise<Required<IUserEntity>> {
    const userSchema = user as any; // work around
    await TypeormUserSchema.save(userSchema);
    return user;
  }
}

export default TypeormUserRepository;
