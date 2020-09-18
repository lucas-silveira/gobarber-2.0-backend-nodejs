/* eslint-disable import/no-extraneous-dependencies */
import { container } from 'tsyringe';
import { plainToClassFromExist } from 'class-transformer';
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

    return plainToClassFromExist(recoveryToken, recoveryTokenDB);
  }

  public async findByToken(
    token: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryTokenDB = await TypeormRecoveryTokenSchema.findOne({
      where: { token },
    });

    if (!recoveryTokenDB) return null;

    const recoveryToken = container.resolve(RecoveryTokenEntity);

    return plainToClassFromExist(recoveryToken, recoveryTokenDB);
  }
}

export default TypeormRecoveryTokenRepository;
