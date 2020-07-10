export default interface IEnctryptor {
  makeHash(data: string, strength: string | number): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}
