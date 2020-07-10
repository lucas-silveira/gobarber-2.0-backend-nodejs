import IUser from '@domain/entities/User.interface';
import { IRepository } from './Repository.interface';

class UserRepository implements IRepository<IUser> {
  private dbUser: IRepository<IUser>;

  constructor(dbUser: IRepository<IUser>) {
    this.dbUser = dbUser;
  }

  public async findAll(): Promise<IUser[]> {
    return this.dbUser.findAll();
  }

  public async findOne(where: IRepository.Where): Promise<IUser | null> {
    return this.dbUser.findOne(where);
  }

  public async create(user: IUser): Promise<IUser> {
    return this.dbUser.create(user);
  }
}

export default UserRepository;
