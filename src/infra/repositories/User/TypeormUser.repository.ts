import TypeormUserSchema from '@infra/schemas/User/TypeormUser.schema';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import IUserEntity from '@domain/entities/UserEntity.interface';
import User from '@domain/entities/User.entity';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<IUserEntity[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<IUserEntity | null> {
    const user = await TypeormUserSchema.findOne({ where: { id } });

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.avatar, user.password);
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await TypeormUserSchema.findOne({ where: { email } });

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.avatar, user.password);
  }

  public async create({
    name,
    email,
    password,
  }: IUserRepository.createInput): Promise<IUserEntity> {
    const user = TypeormUserSchema.create({
      name,
      email,
      password,
    });
    await TypeormUserSchema.save(user);

    return new User(user.id, user.name, user.email, user.avatar, user.password);
  }

  public async update(user: IUserEntity): Promise<IUserEntity> {
    const userSchema = user as any; // work around
    await TypeormUserSchema.save(userSchema);
    return user;
  }

  public async delete(id: string): Promise<void> {
    TypeormUserSchema.delete(id);
  }
}

export default TypeormUserRepository;
