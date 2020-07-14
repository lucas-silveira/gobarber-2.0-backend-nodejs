import { hash, compare } from 'bcryptjs';

import IEncryptor from './Encryptor.interface';

class BcryptEncryptor implements IEncryptor {
  public async makeHash(
    data: string,
    strength: string | number,
  ): Promise<string> {
    return hash(data, strength);
  }

  public async compare(data: string, dataHash: string): Promise<boolean> {
    return compare(data, dataHash);
  }
}

export default BcryptEncryptor;
