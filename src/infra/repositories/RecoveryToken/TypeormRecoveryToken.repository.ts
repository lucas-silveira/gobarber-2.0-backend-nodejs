/* eslint-disable import/no-extraneous-dependencies */
import { container } from 'tsyringe';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import RecoveryTokenEntity from '@domain/entities/RecoveryToken.entity';
import IRecoveryTokenEntity from '@domain/entities/RecoveryTokenEntity.interface';
import TypeormRecoveryTokenSchema from '@infra/schemas/RecoveryToken/TypeormRecoveryToken.schema';

class TypeormRecoveryTokenRepository implements IRecoveryTokenRepository {
  public async generate(userId: string): Promise<string> {
    const recoveryToken = TypeormRecoveryTokenSchema.create({
      user_id: userId,
    });

    await TypeormRecoveryTokenSchema.save(recoveryToken);

    return recoveryToken.token;
  }

  public async findByUserId(
    userId: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryTokenDB = await TypeormRecoveryTokenSchema.findOne({
      where: { user_id: userId },
    });

    if (!recoveryTokenDB) return null;

    const recoveryToken = container.resolve(RecoveryTokenEntity);

    recoveryToken.id = recoveryTokenDB.id;
    recoveryToken.token = recoveryTokenDB.token;
    recoveryToken.user_id = recoveryTokenDB.user_id;
    recoveryToken.created_at = recoveryTokenDB.created_at;

    return recoveryToken;
  }

  public async findByToken(
    token: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryTokenDB = await TypeormRecoveryTokenSchema.findOne({
      where: { token },
    });

    if (!recoveryTokenDB) return null;

    const recoveryToken = container.resolve(RecoveryTokenEntity);

    recoveryToken.id = recoveryTokenDB.id;
    recoveryToken.token = recoveryTokenDB.token;
    recoveryToken.user_id = recoveryTokenDB.user_id;
    recoveryToken.created_at = recoveryTokenDB.created_at;

    return recoveryToken;
  }
}

export default TypeormRecoveryTokenRepository;
