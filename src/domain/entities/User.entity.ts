import IUserEntity from './UserEntity.interface';

class User implements IUserEntity {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly avatar: string;

  public readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.id = '';
    this.name = name;
    this.email = email;
    this.avatar = '';
    this.password = password;
  }
}

export default User;
