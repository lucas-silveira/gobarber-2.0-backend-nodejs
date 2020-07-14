export default interface IEncryptor {
  makeHash(data: string, strength: string | number): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}
