import IUserEntity from './UserEntity.interface';

class User implements IUserEntity {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
