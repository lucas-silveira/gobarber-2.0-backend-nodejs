export interface IMakeHash {
  makeHash(data: string, strength: string | number): Promise<string>;
}

export interface ICompare {
  compare(bareData: string, hashedData: string): Promise<boolean>;
}

export interface IEncryptor extends IMakeHash, ICompare {}
