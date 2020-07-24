import IUser from '@domain/entities/User.interface';
import IRepository from './Repository.interface';

export default interface IUserRepository {
  findAll: IRepository.FindAll<IUser>;
  findOne: IRepository.FindOne<IUser, Required<IUser>>;
  create: IRepository.Create<IUser, Required<IUser>>;
  update: IRepository.Update<Required<IUser>, Required<IUser>>;
}
