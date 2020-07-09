import IUser from '@domain/entities/User.interface';
import IRepository from './Repository.interface';

class UserRepository implements IRepository<IUser> {
  private dbAppointment: IRepository<IUser>;

  constructor(dbAppointment: IRepository<IUser>) {
    this.dbAppointment = dbAppointment;
  }

  public async findAll(): Promise<IUser[]> {
    return this.dbAppointment.findAll();
  }

  public async findByDate(date: Date): Promise<IUser | null> {
    return this.dbAppointment.findByDate(date);
  }

  public async create(appointment: IUser): Promise<IUser> {
    return this.dbAppointment.create(appointment);
  }
}

export default UserRepository;
