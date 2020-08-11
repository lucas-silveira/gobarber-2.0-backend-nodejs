import TypeormUserSchema from '@infra/schemas/typeorm/TypeormUser.schema';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import IUserEntity from '@domain/entities/UserEntity.interface';

class TypeormUserRepository implements IUserRepository {
  public async findAll(): Promise<IUserEntity[]> {
    return TypeormUserSchema.find();
  }

  public async findById(id: string): Promise<IUserEntity | null> {
    const user = await TypeormUserSchema.findOne({ where: { id } });
    return user || null;
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await TypeormUserSchema.findOne({ where: { email } });
    return user || null;
  }

  public async create(user: IUserEntity): Promise<IUserEntity> {
    delete user.id;
    const newUser = TypeormUserSchema.create(user);
    await TypeormUserSchema.save(newUser);
    return newUser;
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
