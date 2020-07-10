import IEncryptor from './Encryptor.interface';
import BcryptEncryptorAdapter from './BcryptEncryptor.adapter';

class Encryptor implements IEncryptor {
  private encryptorAdapter: IEncryptor;

  constructor() {
    this.encryptorAdapter = new BcryptEncryptorAdapter();
  }

  public async makeHash(
    data: string,
    strength: string | number,
  ): Promise<string> {
    return this.encryptorAdapter.makeHash(data, strength);
  }

  public async compare(data: string, hash: string): Promise<boolean> {
    return this.encryptorAdapter.compare(data, hash);
  }
}

export default new Encryptor();
