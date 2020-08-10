export interface IUserTokensRepository {
  generate: (userId: string) => Promise<string>;
}
