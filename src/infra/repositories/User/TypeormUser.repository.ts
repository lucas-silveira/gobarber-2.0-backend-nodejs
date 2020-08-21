import TypeormUserSchema from '@infra/schemas/User/TypeormUser.schema';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import IUserEntity from '@domain/entities/UserEntity.interface';
import User from '@domain/entities/User.entity';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<IUserEntity[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<IUserEntity | null> {
    const userDB = await TypeormUserSchema.findOne({ where: { id } });

    if (!userDB) return null;

    const user = new User();

    user.id = userDB.id;
    user.name = userDB.name;
    user.email = userDB.email;
    user.avatar = userDB.avatar;
    user.password = userDB.password;

    return user;
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const userDB = await TypeormUserSchema.findOne({ where: { email } });

    if (!userDB) return null;

    const user = new User();

    user.id = userDB.id;
    user.name = userDB.name;
    user.email = userDB.email;
    user.avatar = userDB.avatar;
    user.password = userDB.password;

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: IUserRepository.createInput): Promise<IUserEntity> {
    const userDB = TypeormUserSchema.create({
      name,
      email,
      password,
    });

    await TypeormUserSchema.save(userDB);

    const user = new User();

    user.id = userDB.id;
    user.name = userDB.name;
    user.email = userDB.email;
    user.avatar = userDB.avatar;
    user.password = userDB.password;

    return user;
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
