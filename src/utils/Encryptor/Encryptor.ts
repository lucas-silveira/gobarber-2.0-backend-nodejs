import IEncryptor from './Encryptor.interface';
import BcryptEncryptorAdapter from './BcryptEncryptor.adapter';

class Encryptor implements IEncryptor {
  private bcryptEncryptorAdapter: IEncryptor;

  constructor() {
    this.bcryptEncryptorAdapter = new BcryptEncryptorAdapter();
  }

  public async makeHash(
    data: string,
    strength: string | number,
  ): Promise<string> {
    return this.bcryptEncryptorAdapter.makeHash(data, strength);
  }
}

export default new Encryptor();
