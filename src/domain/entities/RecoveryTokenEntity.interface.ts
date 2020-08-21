export default interface IRecoveryTokenEntity {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;

  isExpired: () => boolean;
}
