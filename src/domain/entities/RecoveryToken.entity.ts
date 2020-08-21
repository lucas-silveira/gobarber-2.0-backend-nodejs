import IRecoveryTokenEntity from './RecoveryTokenEntity.interface';

class RecoveryTokenEntity implements IRecoveryTokenEntity {
  public readonly id: string;

  public readonly token: string;

  public readonly user_id: string;

  public readonly created_at: Date;

  constructor(id: string, token: string, user_id: string, created_at: Date) {
    this.id = id;
    this.token = token;
    this.user_id = user_id;
    this.created_at = created_at;
  }
}

export default RecoveryTokenEntity;
