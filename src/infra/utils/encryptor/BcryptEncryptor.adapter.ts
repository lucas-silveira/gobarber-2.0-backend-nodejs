import { hash, compare } from 'bcryptjs';

import IEncryptor from '@domain/protocols/utils/Encryptor.interface';

class BcryptEncryptorAdapter implements IEncryptor {
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

export default BcryptEncryptorAdapter;
