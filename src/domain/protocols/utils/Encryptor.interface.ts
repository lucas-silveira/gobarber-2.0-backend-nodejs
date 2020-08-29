export default interface IEncryptor {
  makeHash(data: string, strength: string | number): Promise<string>;
  compare(bareData: string, hashedData: string): Promise<boolean>;
}
