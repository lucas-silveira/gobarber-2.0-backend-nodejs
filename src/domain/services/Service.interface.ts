export default interface IService<T, R> {
  execute(DTO: T): R;
}
