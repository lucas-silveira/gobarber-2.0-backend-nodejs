export default interface IEnctryptor {
  makeHash(data: string, strength: string | number): Promise<string>;
}
