import IUserEntity from './UserEntity.interface';

class User implements IUserEntity {
  public id: string;

  public name: string;

  public email: string;

  public avatar: string;

  public password: string;
}

export default User;
