import { plainToClass } from 'class-transformer';
import TypeormAppointmentSchema from '@infra/schemas/Appointment/TypeormAppointment.schema';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import Appointment from '@domain/entities/Appointment.entity';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointmentEntity[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(date: Date): Promise<IAppointmentEntity | null> {
    const appointmentDB = await TypeormAppointmentSchema.findOne({
      where: { date },
    });

    if (!appointmentDB) return null;

    return plainToClass(Appointment, appointmentDB);
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentRepository.createInput): Promise<IAppointmentEntity> {
    const newAppointment = TypeormAppointmentSchema.create({
      provider_id,
      date,
    });
    await TypeormAppointmentSchema.save(newAppointment);

    return plainToClass(Appointment, newAppointment);
  }
}

export default TypeormAppointmentRepository;
