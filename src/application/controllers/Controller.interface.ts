export default interface IController<T, R> {
  handle(DTO: T): R;
}
