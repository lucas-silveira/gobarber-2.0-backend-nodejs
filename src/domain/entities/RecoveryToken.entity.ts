import { injectable, inject } from 'tsyringe';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import IRecoveryTokenEntity from './RecoveryTokenEntity.interface';

@injectable()
class RecoveryTokenEntity implements IRecoveryTokenEntity {
  private dateHandler: IDateHandler;

  public id: string;

  public token: string;

  public user_id: string;

  public created_at: Date;

  constructor(
    @inject('DateHandler')
    dateHandler: IDateHandler,
  ) {
    this.dateHandler = dateHandler;
  }

  public isExpired(): boolean {
    if (this.dateHandler.differenceInHours(Date.now(), this.created_at) > 2) {
      return true;
    }
    return false;
  }
}

export default RecoveryTokenEntity;
