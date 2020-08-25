import { container } from 'tsyringe';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import TypeormAppointmentRepository from '@infra/repositories/Appointment/TypeormAppointment.repository';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import TypeormUserRepository from '@infra/repositories/User/TypeormUser.repository';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import TypeormRecoveryTokenRepository from '@infra/repositories/RecoveryToken/TypeormRecoveryToken.repository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  TypeormAppointmentRepository,
);
container.registerSingleton<IUserRepository>(
  'UserRepository',
  TypeormUserRepository,
);
container.registerSingleton<IRecoveryTokenRepository>(
  'RecoveryTokenRepository',
  TypeormRecoveryTokenRepository,
);
