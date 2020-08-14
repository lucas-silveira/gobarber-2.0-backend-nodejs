import IUserEntity from './UserEntity.interface';

class User implements IUserEntity {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly avatar: string;

  public readonly password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    avatar: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.password = password;
  }
}

export default User;
