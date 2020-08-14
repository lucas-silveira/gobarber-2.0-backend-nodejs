import TypeormAppointmentSchema from '@infra/schemas/Appointment/TypeormAppointment.schema';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import Appointment from '@domain/entities/Appointment.entity';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointmentEntity[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(date: Date): Promise<IAppointmentEntity | null> {
    const appointment = await TypeormAppointmentSchema.findOne({
      where: { date },
    });

    if (!appointment) return null;

    return new Appointment(
      appointment.id,
      appointment.provider_id,
      appointment.date,
    );
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentRepository.createInput): Promise<IAppointmentEntity> {
    const appointment = TypeormAppointmentSchema.create({
      provider_id,
      date,
    });
    await TypeormAppointmentSchema.save(appointment);

    return new Appointment(
      appointment.id,
      appointment.provider_id,
      appointment.date,
    );
  }
}

export default TypeormAppointmentRepository;
