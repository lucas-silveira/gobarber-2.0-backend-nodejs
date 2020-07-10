import IUser from '@domain/entities/User.interface';

export default interface ICreateUserService {
  execute: (user: IUser) => Promise<IUser>;
}
