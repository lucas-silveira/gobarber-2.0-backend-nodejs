import { hash } from 'bcryptjs';

import IEnctryptor from './Encryptor.interface';

class BcryptEncryptor implements IEnctryptor {
  public async makeHash(
    data: string,
    strength: string | number,
  ): Promise<string> {
    return hash(data, strength);
  }
}

export default BcryptEncryptor;
